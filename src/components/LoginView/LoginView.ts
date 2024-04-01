import { defineComponent, ref } from 'vue';
import service from '@/services/service';
import { useAuthStore } from '@/store/store';
import router from '@/route/router';
import LoadingScreen from '@/components/LoadingView/LoadingScreen.vue';

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
            errorMessage: ref({ message: "" }),
            isLoading: ref({ val: false })
        }
    },
    methods: {
        login() {
            //make sure username OR password are not empty
            if (this.input.username != "" && this.input.password != "") {
                this.isLoading.val = true;
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
                        localStorage.setItem('token', response.data.token);
                        router.push({ name: "home" });
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                        if (error.response.status == 401) {
                            this.errorMessage.message = "Kullanıcı adı ve şifre hatalı"
                        } else {
                            this.errorMessage.message = error.message;
                        }
                    }).finally(
                        () => {
                            this.isLoading.val = false;
                        }
                    );
            } else {
                console.log("Username and Password can not be empty")
            }
        }
    },
})