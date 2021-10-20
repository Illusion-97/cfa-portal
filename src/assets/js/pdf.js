/* eslint-disable no-unused-vars */
import PDFJS from "pdfjs"
import resizeSensor from "../js/resizeSensor"
import Vue from "@vue"

function isPDFDocumentLoadingTask(obj) {
	return typeof(obj) === 'object' && obj !== null && obj.__PDFDocumentLoadingTask === true;
}
function createLoadingTask(src, options) {
	var loadingTask = PDFJS.getDocument(src);
	loadingTask.__PDFDocumentLoadingTask = true; // since PDFDocumentLoadingTask is not public
	
	if ( options && options.onPassword )
		loadingTask.onPassword = options.onPassword;
	if ( options && options.onProgress )
		loadingTask.onProgress = options.onProgress;
	return loadingTask;
}
function PDFJSWrapper(PDFJS, canvasElt, annotationLayerElt, emitEvent) {
	
	var pdfDoc = null;
	var pdfPage = null;
	var pdfRender = null;
	function clearCanvas() {
		
		canvasElt.getContext('2d').clearRect(0, 0, canvasElt.width, canvasElt.height);
	}
	
	function clearAnnotations() {
		
		while ( annotationLayerElt.firstChild )
			annotationLayerElt.removeChild(annotationLayerElt.firstChild);
	}
	
	this.destroy = function() {
		
		if ( pdfDoc === null )
			return;
		pdfDoc.destroy();
		pdfDoc = null;
	}
	
	this.getResolutionScale = function() {
		
		return canvasElt.offsetWidth / canvasElt.width;
	}
	this.printPage = function(dpi, pageNumberOnly) {
		if ( pdfPage === null )
			return;
		
		// 1in == 72pt
		// 1in == 96px
		var PRINT_RESOLUTION = dpi === undefined ? 150 : dpi;
		var PRINT_UNITS = PRINT_RESOLUTION / 72.0;
		var CSS_UNITS = 96.0 / 72.0;
		
		var iframeElt = document.createElement('iframe');
		function removeIframe() {
			iframeElt.parentNode.removeChild(iframeElt);
		}
		
		new Promise(function(resolve, reject) {
			iframeElt.frameBorder = '0';
			iframeElt.scrolling = 'no';
			iframeElt.width = '0px;' 
			iframeElt.height = '0px;'
			iframeElt.style.cssText = 'position: absolute; top: 0; left: 0';
			iframeElt.onload = function() {
				
				resolve(this.contentWindow);
			}
			
			window.document.body.appendChild(iframeElt);
		})
		.then(function(win) {
			
			win.document.title = '';
			return pdfDoc.getPage(1)
			.then(function(page) {
				
				var viewport = page.getViewport(1);
				win.document.head.appendChild(win.document.createElement('style')).textContent = 
					'@supports ((size:A4) and (size:1pt 1pt)) {' +
						'@page { margin: 1pt; size: ' + ((viewport.width * PRINT_UNITS) / CSS_UNITS) + 'pt ' + ((viewport.height * PRINT_UNITS) / CSS_UNITS) + 'pt; }' +
					'}' +
					'@media print {' +
						'body { margin: 0 }' +
						'canvas { page-break-before: avoid; page-break-after: always; page-break-inside: avoid }' +
					'}'+
					'@media screen {' +
						'body { margin: 0 }' +
					'}'+
					''
				return win;
			})
		})
		.then(function(win) {
			
			var allPages = [];
			
			for ( var pageNumber = 1; pageNumber <= pdfDoc.numPages; ++pageNumber ) {
				
				if ( pageNumberOnly !== undefined && pageNumberOnly.indexOf(pageNumber) === -1 )
					continue;
				
				allPages.push(
					pdfDoc.getPage(pageNumber)
					.then(function(page) {
						var viewport = page.getViewport(1);
					
						var printCanvasElt = win.document.body.appendChild(win.document.createElement('canvas'));
						printCanvasElt.width = (viewport.width * PRINT_UNITS);
						printCanvasElt.height = (viewport.height * PRINT_UNITS);
						return page.render({
							canvasContext: printCanvasElt.getContext('2d'),
							transform: [ // Additional transform, applied just before viewport transform.
								PRINT_UNITS, 0, 0,
								PRINT_UNITS, 0, 0
							],
							viewport: viewport,
							intent: 'print'
						}).promise;
					})
				);
			}
			
			Promise.all(allPages)
			.then(function() {
				
				win.focus(); // Required for IE
				win.print();
				removeIframe();
			})
			.catch(function(err) {
			
				removeIframe();
				emitEvent('error', err);
			})
		})
	}
	
	this.renderPage = function(rotate) {
		
		if ( pdfRender !== null )
			return pdfRender.cancel();
		if ( pdfPage === null )
			return;
		if ( rotate === undefined )
			rotate = 0;
		var viewport = pdfPage.getViewport(canvasElt.offsetWidth / pdfPage.getViewport(1).width, rotate);
		var devicePixelRatio = window.devicePixelRatio || 1;
		var pageWidth = viewport.width * devicePixelRatio;
		var pageHeight = viewport.height * devicePixelRatio;
		
		emitEvent('page-size', pageWidth, pageHeight);
		
		canvasElt.width = pageWidth;
		canvasElt.height = pageHeight;
		pdfRender = pdfPage.render({
			canvasContext: canvasElt.getContext('2d'),
			viewport: viewport
		});
		
		annotationLayerElt.style.visibility = 'hidden';
		clearAnnotations();
		
		pdfPage.getAnnotations()
		.then(function(annotations) {
			PDFJS.AnnotationLayer.render({
				viewport: viewport.clone({ dontFlip: true }),
				div: annotationLayerElt,
				annotations: annotations,
				page: pdfPage,
				//linkService: new LinkServiceMock(),
				renderInteractiveForms: false,
			});
		});
		pdfRender
		.then(function() {
			
			annotationLayerElt.style.visibility = '';
			pdfRender = null;
		})
		.catch(function(err) {
			pdfRender = null;
			if ( err === 'cancelled' )
				return this.renderPage(rotate);
			emitEvent('error', err);
		}.bind(this))
	}		
	this.forEachPage = function(pageCallback) {
		var numPages = pdfDoc.pdfInfo.numPages;
		(function next(pageNum) {
			pdfDoc.getPage(pageNum)
			.then(pageCallback)
			.then(function() {
				
				if ( ++pageNum <= numPages )
					next(pageNum);
			})
		})(1);
	}
	this.loadPage = function(pageNumber, rotate) {
		
		pdfPage = null;
		
		if ( pdfDoc === null )
			return;
		
		pdfDoc.getPage(pageNumber)
		.then(function(page) {
			pdfPage = page;
			this.renderPage(rotate);
			emitEvent('page-loaded', page.pageNumber);
		}.bind(this))
		.catch(function(err) {
			
			clearCanvas();
			clearAnnotations();
			emitEvent('error', err);
		});
	}
	this.loadDocument = function(src) {
		
		pdfDoc = null;
		pdfPage = null;
		
		emitEvent('num-pages', undefined);
		if ( !src ) {
			
			canvasElt.removeAttribute('width');
			canvasElt.removeAttribute('height');
			clearAnnotations();
			return;
		}
		
		if ( isPDFDocumentLoadingTask(src) ) {
			var loadingTask = src;
		} else {
			loadingTask = createLoadingTask(src, {
				onPassword: function(updatePassword, reason) {
					
					var reasonStr;
					switch (reason) {
						case PDFJS.PasswordResponses.NEED_PASSWORD:
							reasonStr = 'NEED_PASSWORD';
							break;
						case PDFJS.PasswordResponses.INCORRECT_PASSWORD:
							reasonStr = 'INCORRECT_PASSWORD';
							break;
					}
					emitEvent('password', updatePassword, reasonStr);
				},
				onProgress: function(status) {
					
					var ratio = status.loaded / status.total;
					emitEvent('progress', Math.min(ratio, 1));
				}
			});
		}
		
		loadingTask
		.then(function(pdf) {
			
			pdfDoc = pdf;
			emitEvent('num-pages', pdf.numPages);
			emitEvent('loaded');
		})
		.catch(function(err) {
			
			clearCanvas();
			clearAnnotations();
			emitEvent('error', err);
		})
	}
	
	annotationLayerElt.style.transformOrigin = '0 0';
}
const pdf = {
	createLoadingTask,
	render(h) {
		return h('div', {
			attrs: {
				style: 'position: relative'
			}
		}, [
			h('canvas', {
				style: {
					display: 'block',
					width: '100%',
				}
			}),
			h('div', {
				class: 'annotationLayer'
			}),
			h(resizeSensor, {
				props: {
					initial: true
				},
				on: {
					resize: this.resize
				},
			})
		])
	},
	props: {
		src: {
			type: [String, Object],
			default: '',
		},
		page: {
			type: Number,
			default: 1,
		},
		rotate: {
			type: Number,
			default: 0,
		},
	},
	watch: {
		src: function() {
			
			this.pdf.loadDocument(this.src);
		},
		page: function() {
			
			this.pdf.loadPage(this.page, this.rotate);
		},
		rotate: function() {
			
			this.pdf.renderPage(this.rotate);
		},
	},
	methods: {
		resize: function(size) {
	
			var canvasElt = this.$el.childNodes[0];
			var annotationLayerElt = this.$el.childNodes[1];
			// on IE10- canvas height must be set
			canvasElt.style.height = canvasElt.offsetWidth * (canvasElt.height / canvasElt.width) + 'px';
			// update the page when the resolution is too poor
			var resolutionScale = this.pdf.getResolutionScale();
			
			if ( resolutionScale < 0.85 || resolutionScale > 1.15 )
				this.pdf.renderPage(this.rotate);
			annotationLayerElt.style.transform = 'scale('+resolutionScale+')';
		},
		print: function(dpi, pageList) {
			this.pdf.printPage(dpi, pageList);
		}
	},
	mounted: function() {
		
		var canvasElt = this.$el.childNodes[0];
		var annotationLayerElt = this.$el.childNodes[1];
		
		this.pdf = new PDFJSWrapper(PDFJS, canvasElt, annotationLayerElt, this.$emit.bind(this));
		
		this.$on('loaded', function() {
			
			this.pdf.loadPage(this.page, this.rotate);
		});
		
		this.$on('page-size', function(width, height) {
			
			canvasElt.style.height = canvasElt.offsetWidth * (height / width) + 'px';
		});
		
		this.pdf.loadDocument(this.src);
	},
	destroyed: function() {
		
		this.pdf.destroy();
	}
}

window.PDFJS.workerSrc = 'https://npmcdn.com/pdfjs-dist/build/pdf.worker.js';

new Vue({
	el: '#app',
  data: {
page: 1,
numPages: 0,
  },
template:'#main',
components:{
pdf: pdf
  },
});