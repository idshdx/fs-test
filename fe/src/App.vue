<template>
    <div id="app">
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<style lang="scss">
    @import "bootstrap/scss/bootstrap.scss";

    html, body, #app {
        height: 100%;
        width: 100%;
    }
    h4 {
        color: #007bff;
    }
    a, input[type='checkbox'] {
        cursor: pointer;
    }
</style>
