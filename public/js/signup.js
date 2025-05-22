window.addEventListener("DOMContentLoaded", () => {
    const customerRadio = document.getElementById("customer-radio");
    const businessRadio = document.getElementById("business-radio");
    const businessFields = document.getElementById("business-fields");
    const customerFields = document.getElementById("customer-fields");
    
    function toggleFields(){
        if(customerRadio.checked){
            customerFields.style.display = "block";
            businessFields.style.display = "none";
        } else if(businessRadio.checked){
            businessFields.style.display = "block";
            customerFields.style.display = "none";
        }
    }

    if(customerRadio && businessRadio){
        customerRadio.addEventListener("change", toggleFields);
        businessRadio.addEventListener("change", toggleFields);
        toggleFields();
    }
});




