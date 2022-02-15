<template>
    <header>
        <img src="@/assets/img/institutionnel-logo.png" alt="logo" class="mon-logo" />
        <div class="redBanner">
            <h1>Espace étudiant</h1>
        </div>
    </header>
</template>

<script>


</script>

<style scoped>
    .redBanner {
        background-color: #e11b28;
        width: 2000px;
        padding: 100px 0 100px 100px;
        border-radius: 10px 0 0 10px;
    }

    h1 {
        color: white;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .mon-logo {
        width: 7%;
        height: 7%;
        margin-left: 50px;
        margin-right: 150px;
    }
</style>
