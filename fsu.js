var clearbit = {
  "person": {
    "id": "d54c54ad-40be-4305-8a34-0ab44710b90d",
    "name": {
      "fullName": "Alex MacCaw",
      "givenName": "Alex",
      "familyName": "MacCaw"
    },
    "email": "alex@alexmaccaw.com",
    "//": "...",
    "employment": {
      "domain": "clearbit.com",
      "name": "Clearbit",
      "title": "Founder and CEO",
      "role": "ceo",
      "seniority": "executive"
    }
  },
  "company": {
    "id": "c5a6a9c5-303a-455a-935c-9dffcd2ed756",
    "name": "Alex MacCaw",
    "metrics": {
      "alexaUsRank": 544,
      "alexaGlobalRank": 943,
      "employees": 20313,
      "employeesRange": "1000+",
      "marketCap": null,
      "raised": 10610000000,
      "annualRevenue": null
    },
    "legalName": "Alex MacCaw",
    "domain": "alexmaccaw.com",
    "//": "..."
  }
}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}

function fetchData(data) {
  // Split data-clearbit value by period into array
  // and has child keys (e.g "company.metrics.employees")
  if (data.indexOf('.') !== -1) {
    composedData = data.split('.');

    // Return clearbit value in JSON based on data-clearbit value
    // and has child and grand-child keys
    if (composedData.length === 2) {
      return val = clearbit[composedData[0]][composedData[1]];
    } else if (composedData.length === 3) {
      return val = clearbit[composedData[0]][composedData[1]][composedData[2]];
    }

  }
  // If level one data (e.g "name")
  else {
    return val = clearbit[data];
  }
}

function checkMappingRole(val, currentInputData, currentInputMapping) {

  // Check if data-mapping is true or false
  // and data-clearbit contains role
  // else continue with raw value (e.g "ceo")

  if (currentInputData.includes("role") && currentInputMapping === "true") {
    customMappingRole(val)
  }
  else if (currentInputData.includes("role") && currentInputMapping === "false") {
    currentInput.value = val;
  }
  else {
    currentInput.value = val;
  }
}

function customMappingRole(val) {
  if (val.includes('customer')) {
    currentInput.value = "customer";
  }
  else if (val.includes('design')) {
    currentInput.value = "design";
  }
  else if (val.includes('tech')) {
    currentInput.value = "tech";
  }
  else if (val.includes('sales')) {
    currentInput.value = "sales";
  }
  else if (val.includes('marketing')) {
    currentInput.value = "cmo";
  }
  else if (val.includes('ceo')) {
    currentInput.value = "ceo";
  }
  else {
    currentInput.value = val
  }
}

function checkMappingSize(val, currentInputData, currentInputMapping) {

  // Check if data-mapping is true or false
  // and data-clearbit contains employees
  // else continue with raw value (e.g "20000")

  if (currentInputData.includes("employees") && currentInputMapping === "true") {
    customMappingSize(val)
  }
  else if (currentInputData.includes("employees") && currentInputMapping === "false") {
    currentInput.value = val;
  }
  else {
    currentInput.value = val;
  }
}

function customMappingSize(val) {
  if (val >= 0 && val < 5) {
    currentInput.value = "1-5 employees";
  }
  else if (val >= 5 && val < 10) {
    currentInput.value = "5-10 employees";
  }
  else if (val >= 10 && val < 50) {
    currentInput.value = "10-50 employees";
  }
  else if (val >= 50 && val < 100) {
    currentInput.value = "50-100 employees";
  }
  else if (val >= 100 && val < 1000) {
    currentInput.value = "100-1000 employees";
  }
  else if (val >= 1000) {
    currentInput.value = "1000+ employees";
  }
  else {
    currentInput.value = val
  }
}

function setVal(val, currentInput) {
  var currentInputData = currentInput.getAttribute('data-clearbit');
  var currentInputMapping = currentInput.getAttribute('data-mapping');

  // Befor setting value check if mapping is true
  // and custom mapping to return custom value (e.g "Company Size")

  checkMappingSize(val, currentInputData, currentInputMapping)
}

function prefill() {
  // Get all data clearbit inputs
  var clearbitSelectors = document.querySelectorAll('[data-clearbit]');
  for (var i = 0; i < clearbitSelectors.length; i++) {
    // Fetch data
    currentInput = clearbitSelectors[i];
    currentInputData = currentInput.getAttribute('data-clearbit');
    fetchData(currentInputData);

    // Set val
    setVal(val, currentInput)
  }
}

// function fetchAPI() {
//   var request = new XMLHttpRequest();
//   request.open('GET', 'https://mention.com/wp-content/themes/mention/scripts/wp-clearbit.php', true);

//   request.onload = function() {
//     if (request.status >= 200 && request.status < 400) {
//       // Success!
//       return clearbit = JSON.parse(request.responseText);
//     } else {
//       console.log('error API');
//     }
//   };

//   request.onerror = function() {
//     console.log('connexion error');
//   };

//   request.send();
// }

window.onload = function() {
  var email = getUrlParameter('email')
  // fetchAPI()
  prefill()
};