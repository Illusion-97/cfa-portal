2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
import axios from "axios";
import {
  requestOptions
} from "@/_helpers/request-options.js";
//import handleResponse from '@/_helpers/handle-response.js';
export const utilisateurApi = {

  getById,
  getByLogin,
  getAllByPage,
  getCount,
  getByRoleByPage,
  getCountByRole,
  getByIdWithObject,
  getAdresseById,
  getPlanningById,
  getRoleById,
  getAllUtilisateurs,
  getAllUtilisateursByEntreprise,
  getAllUtilisateursByAdresse,
  addUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  getAllUsersByName,
  save,
};
const END_POINT = "utilisateurs";
const ADRESSE = "adresse";
const ENTREPRISE = "entreprise";
/*
function getById(id) {
    let req =  "utilisateurs/" + id;
    return fetch(req, requestOptions.get())
        //.then(handleResponse);
}
*/
function getAllByPage(page, size, search = "") {
  let req = `/${END_POINT}/${page}/${size}/${search}`;
  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

function getCount(search = "") {
  let req = `/${END_POINT}/count/${search}`;
  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}

function getByRoleByPage(role, page, size, search = "") {
  let req = `/${END_POINT}/${page}/${size}?role=${role}&search=${search}`;
  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

function getCountByRole(role, search = "") {
  let req = `/${END_POINT}/count?role=${role}&search=${search}`;
  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data["nb"])
    .catch((error) => console.log(error));
}

function getById(id) {
  let req = `/utilisateurs/${id}`;
  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

function getByLogin(login) {
  let req = `/utilisateurs/email=${login}`;
  return axios
    .get(req, requestOptions.headers())
    .then(response => response.data)
    .catch((error) => console.log(error));
}

function getByIdWithObject(id) {
  let req = "utilisateurs/" + id + "/with-object";
  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAdresseById(id) {
  let req = "utilisateurs/" + id + "/adresse";
  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getPlanningById(id) {
  let req = "utilisateurs/" + id + "/planning";
  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getRoleById(id) {
  let req = "utilisateurs/" + id + "/roles";
  return axios
    .get(req, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAllUtilisateurs() {
  return axios
    .get(`${END_POINT}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
async function getAllUsersByName(name) {
  let users = [];
  const response = await axios.get(`$/admin/userList?name=${name}`, requestOptions.headers());
  users = response.data;
  return users;
}

function getAllUtilisateursByEntreprise() {
  return axios
    .get(`${END_POINT}/${ENTREPRISE}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function getAllUtilisateursByAdresse() {
  return axios
    .get(`${END_POINT}/${ADRESSE}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function addUtilisateur(Utilisateur) {
  return axios
    .post(`${END_POINT}`, Utilisateur, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function updateUtilisateur(Utilisateur) {
  return axios
    .post(`${END_POINT}`, Utilisateur, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

function save(form) {
  let req = "utilisateurs";
  return axios
    .post(req, form, requestOptions.headers())
    .then((response) => response)
    .catch((error) => console.log(error));
}

function deleteUtilisateur(id) {
  return axios
    .delete(`${END_POINT}/${id}`, requestOptions.headers())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}