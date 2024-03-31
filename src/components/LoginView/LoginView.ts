import { defineComponent, ref } from 'vue';
import service from '@/services/service';
import { useAuthStore } from '@/store/store';
import router from '@/route/router';


export default defineComponent({
    components: {

    },
    title: "login",
    data() {
        return {
            input: {
                username: "",
                password: ""
            },
            errorMessage : ref({message:""})
        }
    },
    methods: {
        login() {
            //make sure username OR password are not empty
            if (this.input.username != "" && this.input.password != "") {
                service.postLogin<{
                    username: string,
                    token: string
                }>("/api/token", { username: this.input.username, password: this.input.password })
                    .then((response) => {
                        console.log(response.data.token)

                        const authStore = useAuthStore();
                        authStore.setUserToken(
                            response.data.username,
                            response.data.token
                        );
                        localStorage.setItem( 'token', response.data.token );
                        router.push({ name: "home" });
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                        if(error.response.status == 401) {
                            this.errorMessage.message = "Kullanıcı adı ve şifre hatalı"
                        } else {
                            this.errorMessage.message = error.message;
                        }
                    });
            } else {
                console.log("Username and Password can not be empty")
            }
        }
    },
})