import { defineComponent } from 'vue';
import loginService from '@/services/LoginService';
import { mapMutations } from "vuex";

export default defineComponent({
    components: {

    },
    title: "login",
    data() {
        return {
            input: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        ...mapMutations(["setUser", "setToken"]),
        login() {
            //make sure username OR password are not empty
            if (this.input.username != "" && this.input.password != "") {
                loginService.post<{
                    username: string,
                    token: string
                }>("/api/token", { username: this.input.username, password: this.input.password })
                    .then((response) => {
                        debugger;
                        this.setToken(response.data.token); 
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                    });
            } else {
                console.log("Username and Password can not be empty")
            }
        }
    },
})