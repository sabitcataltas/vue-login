<template>
    <div>
        <input v-model="data.type" type="text" placeholder="Type">
        <input v-model="data.information" type="text" placeholder="Information">
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    name: 'ContactView',
    data() {
        return {
            type: '',
            info: ''
        };
    },
    props: {
        id: {

        },
        type: {
            
        },
        information: {
           
        },
    }
}

const data = ref({
    type: '',
    info: ''
});


</script>

<style scoped></style>