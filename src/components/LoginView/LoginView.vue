<script lang="ts" src="./LoginView.ts" />

<template>
    <form name="login-form">
        <div class="mb-3">
            <label for="username">Username: </label>
            <input type="text" id="username" v-model="input.username" />
        </div>
        <div class="mb-3">
            <label for="password">Password: </label>
            <input type="password" id="password" v-model="input.password" />
        </div>
        <button class="btn btn-outline-dark" type="submit" v-on:click.prevent="login()">
            Login
        </button>
    </form>
</template>
