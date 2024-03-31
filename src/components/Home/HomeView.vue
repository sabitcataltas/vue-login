<template>
    <div>

        <LoadingScreen v-if="isLoading.val"></LoadingScreen>
        <div class="user-info">
            <button type="button" v-on:click.prevent="logout()">
                Logout
            </button>
            <div class="user-info-header">
                <div class="user-details">
                    <form name="user-form">
                        <h4>User</h4>
                        <p>FirstName:<input type="text" v-model="data.firstName"></input></input></p>
                        <p>LastName: <input type="text" v-model="data.lastName"></input></input></p>
                        <p>Username: <input type="text" v-model="data.username" disabled></input></p>
                        <button type="submit" v-on:click.prevent="saveUser()">
                            Save
                        </button>
                    </form>
                </div>
            </div>
            <div class="user-address">
                <form name="address-form">
                    <h4>Address</h4>
                    <p>City:<input type="text" v-model="data.address.city"></input></input></p>
                    <p>District: <input type="text" v-model="data.address.district"></input></input></p>
                    <p>Dountry: <input type="text" v-model="data.address.country"></input></p>
                    <button type="submit" v-on:click.prevent="saveUpdateAddress()">
                        Save
                    </button>
                </form>
            </div>

            <div class="user-informations">
                <h4>Contact Infotmations</h4>
                <div v-for="item in contactInfos" :key="item.id" class="grid-item">
                    <input v-model="item.type" type="text" placeholder="Type" disabled>
                    <input v-model="item.information" type="text" placeholder="Information" disabled>
                    <button type="submit" v-on:click.prevent="deleteContactInfo(item.id)">
                        Delete
                    </button>
                </div>
                <div v-for="item in newContacts" class="grid-item">
                    <input v-model="item.type" type="text" placeholder="Type" disabled>
                    <input v-model="item.information" type="text" placeholder="Information" disabled>
                </div>
                <div class="grid-item">
                    <input v-model="newContact.type" type="text" placeholder="Type">
                    <input v-model="newContact.information" type="text" placeholder="Information">
                    <button type="submit" v-on:click.prevent="addToNewContacts()"
                        :disabled="!newContact.type || !newContact.information">
                        Add
                    </button>
                </div>
                <button type="submit" v-on:click.prevent="saveNewContactInfos()">
                    Save Contacts
                </button>
            </div>

            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import LoadingScreen from '@/components/LoadingView/LoadingScreen.vue';
import ContactView from '@/components/Contact/ContactView.vue';
import service from '@/services/service';
import { ref, onMounted } from "vue";
import router from '@/route/router';

type UserData = {
    id: number | null;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    version: number | null;
    address: {
        id: number | null;
        city: string;
        district: string;
        country: string;
        version: number | null;
    }
};
type ContactInfo = {
    id: number;
    type: string;
    information: string;
};
type NewContactInfo = {
    type: string;
    information: string;
};

const data = ref<UserData>({
    id: null,
    firstName: '',
    lastName: "",
    username: "",
    email: "",
    version: null,
    address: {
        id: null,
        city: "",
        district: "",
        country: "",
        version: null,
    }

});
const contactInfos = ref<ContactInfo[]>([]);
const newContacts = ref<NewContactInfo[]>([]);

const newContact = ref<NewContactInfo>({
    type: '',
    information: '',
});

const isLoading: any = ref({ val: false });
const errorMessage = ref('asffsaa');

const showError = (message: string) => {
    errorMessage.value = message;
};
const clearError = () => {
    errorMessage.value = '';
};

async function saveUser() {
    isLoading.value.val = true;
    await service.post<any>("/user", data.value)
        .then((response) => {

            console.log(response.data);
            fetchData();
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            showError(error);
        }).finally(
            () => {
                isLoading.value.val = false;
            }
        );
};
async function saveUpdateAddress() {
    if (data.value.address.id) {
        updateAddress();
    } else {
        saveAddress();
    }
}
async function saveAddress() {
    isLoading.value.val = true;
    await service.post<any>("/address", data.value.address)
        .then((response) => {

            console.log(response.data);
            fetchData();
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            showError(error);
        }).finally(
            () => {
                isLoading.value.val = false;
            }
        );
};

async function updateAddress() {
    isLoading.value.val = true;
    await service.put<any>("/address", data.value.address)
        .then((response) => {

            console.log(response.data);
            fetchData();
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            showError(error);
        }).finally(
            () => {
                isLoading.value.val = false;
            }
        );
};

async function fetchData() {
    clearError();
    isLoading.value.val = true;
    await service.get<UserData>("/user")
        .then((response) => {

            console.log(response.data);
            data.value = response.data;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            showError(error);
        }).finally(
            () => {
                isLoading.value.val = false;
            }
        );
};
async function fetchContactInfos() {
    clearError();
    isLoading.value.val = true;
    await service.get<ContactInfo[]>("/contact_info")
        .then((response) => {

            console.log(response.data);

            contactInfos.value = response.data;

        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            showError(error);
        }).finally(
            () => {
                isLoading.value.val = false;
            }
        );
};

async function saveNewContactInfos() {
    isLoading.value.val = true;
    console.log(newContacts.value);
    await service.post<NewContactInfo[]>("/contact_info", newContacts.value)
        .then((response) => {

            console.log(response.data);
            newContacts.value = [];
            fetchContactInfos();
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            showError(error);
        }).finally(
            () => {
                isLoading.value.val = false;
            }
        );
};

async function deleteContactInfo(id: number) {
    isLoading.value.val = true;
    await service.delete<NewContactInfo[]>("/contact_info/" + id)
        .then((response) => {
            fetchContactInfos();
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            showError(error);
        }).finally(
            () => {
                isLoading.value.val = false;
            }
        );
};

function addToNewContacts() {
    const newItem: NewContactInfo = {
        type: newContact.value.type,
        information: newContact.value.information
    };
    newContacts.value.push(newItem);
    newContact.value.type = '';
    newContact.value.information = '';
}

function logout() {
    localStorage.setItem('token', '');
    router.push({ name: "login" });
}

onMounted(() => {
    clearError();
    fetchData();
    fetchContactInfos();
});
</script>
<style scoped>
.user-info {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.user-info-header {
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
}

.user-details,
.user-address {
    margin-bottom: 20px;
}

h4 {
    margin-top: 0;
}

.user-details input[type="text"],
.user-address input[type="text"] {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.user-details input[type="text"]:disabled {
    background-color: #f5f5f5;
}

.user-details p,
.user-address p {
    margin-bottom: 10px;
}

.user-address p:last-child {
    margin-bottom: 0;
}

.error-message {
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
}
</style>
