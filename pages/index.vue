<script>
 import FormComponent from "@/components/FormComponent.vue";
 
  export default {
    components: {
      FormComponent,
    },
    methods: {
      handleFormSubmit(formData) {
        console.log("Form data received from component:", formData);
        // Handle form data (e.g., save to database, call API)
      },
    },
  };
  </script>
 
  <style scoped>
  /* Add additional styles if necessary */
  </style>