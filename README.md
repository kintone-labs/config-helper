# kintone-config-helper
[![CircleCI](https://circleci.com/gh/kintone/config-helper.svg?style=shield)](https://circleci.com/gh/kintone/config-helper)

A JavaScript library to help build out the Kintone plug-in config page.
This library provides methods to retrieve App field information such as the Field Type, Field Code and Field Name.

## Setup
1. Download the kintone-config-helper.js file located in the dist directory.
2. In your plug-in file directory, place **kintone-config-helper.js** in the same directory as the other JavaScript files.

        src/  
        ├── html/  
        │        └──── config.html  
        ├── css/  
        │        ├──── 51-modern-default.css  
        │        └──── config.css  
        ├── js/  
        │        ├──── kintone-config-helper.js           <----- Insert here  
        │        └──── config.js  
        │        └──── desktop.js  
        ├── image/  
        │        └──── icon.png  
        └── manifest.json  

3. Specify **kintone-config-helper.js** in the **manifest.json** file
```javascript
 "config": {
    "html": "html/config.html",
    "js": [
      "https://js.kintone.com/jquery/3.3.1/jquery.min.js",
      "js/kintone-config-helper.js",
      "js/config.js"
    ],
    "css": [
      "css/51-modern-default.css",
      "css/config.css"
    ],
    "required_params": [
    ]
  }
```
## Usage

### KintoneConfigHelper.getFields()
Returns an array of all available field informations that exist in the Kintone App.
Each responded array is an object, containing information such as Field Type, Field Code and the Field Name of the fields (responses will vary depending on the field type).

#### Example Request
```javascript
KintoneConfigHelper.getFields().then(function(resp) {
        console.log(resp);
}).catch(function(err) {
        console.log(err);
});
```
#### Example Response
```
0: {type: "SINGLE_LINE_TEXT", code: "prod_name", label: "Product Name"}
1: {type: "MULTI_LINE_TEXT", code: "prod_desc", label: "Description"}
2: {type: "DATE", code: "release_date", label: "Release Date"}
3: {type: "NUMBER", code: "price", label: "Unit Price"}
4: {type: "SINGLE_LINE_TEXT", code: "quick_notes", label: "Notes"}
```
### KintoneConfigHelper.getFields(FIELD_TYPE)
Returns an array of field information that exist in the Kintone App, filtered with the specified field type.
**FIELD_TYPE** must be specified as a String.  
Multiple values may be specified for **FIELD_TYPE**, by specifying an Array of Strings.  
Each responded array is an object, containing information such as Field Type, Field Code and the Field Name of the fields (responses will vary depending on the field type).

#### Example Request 1 - retrieving all Text fields from the App
```javascript
KintoneConfigHelper.getFields("SINGLE_LINE_TEXT").then(function(resp) {
        console.log(resp);
}).catch(function(err) {
        console.log(err);
});
```
#### Example Response 1
```
0: {type: "SINGLE_LINE_TEXT", code: "prod_name", label: "Product Name"}
1: {type: "SINGLE_LINE_TEXT", code: "quick_notes", label: "Notes"}
```
#### Example Request 2 - retrieving all Text and Number fields from the App
```javascript
KintoneConfigHelper.getFields(["SINGLE_LINE_TEXT","NUMBER"]).then(function(resp) {
        console.log(resp);
}).catch(function(err) {
        console.log(err);
});
```
#### Example Response 2
```
0: {type: "SINGLE_LINE_TEXT", code: "prod_name", label: "Product Name"}
1: {type: "NUMBER", code: "price", label: "Unit Price"}
2: {type: "SINGLE_LINE_TEXT", code: "quick_notes", label: "Notes"}
```

### Field Types

Refer to the following table for Field Types that can be specified in the **KintoneConfigHelper.getFields(FIELD_TYPE)** method:

FIELD TYPE value | Field type | Response 1 | Response 2 | Response 3 | 
------------ | ------------- | ------------- | ------------- | -------------
SINGLE_LINE_TEXT | Text | type (field type) | code (field code) | label (field name)
RICH_TEXT | Rich text | type (field type) | code (field code) | label (field name)
MULTI_LINE_TEXT | Text area | type (field type) | code (field code) | label (field name)
NUMBER | Number | type (field type) | code (field code) | label (field name)
CALC | Calculated | type (field type) | code (field code) | label (field name)
RADIO_BUTTON | Radio button | type (field type) | code (field code) | label (field name)
CHECK_BOX | Check box | type (field type) | code (field code) | label (field name)
MULTI_SELECT | Multi-choice | type (field type) | code (field code) | label (field name)
DROP_DOWN | Drop-down | type (field type) | code (field code) | label (field name)
DATE | Date | type (field type) | code (field code) | label (field name)
TIME   | Time | type (field type) | code (field code) | label (field name)
DATETIME | Date and time | type (field type) | code (field code) | label (field name)
FILE | Attachment | type (field type) | code (field code) | label (field name)
LINK | Link | type (field type) | code (field code) | label (field name)
USER_SELECT | User selection | type (field type) | code (field code) | label (field name)
ORGANIZATION_SELECT | Department selection | type (field type) | code (field code) | label (field name)
GROUP_SELECT | Group selection | type (field type) | code (field code) | label (field name)
REFERENCE_TABLE | Related records | type (field type) | code (field code) | label (field name)
SPACER | Blank space | type (field type) | elementId | -
SUBTABLE | Table | type (field type) | code (field code) | -
GROUP | Field group | type (field type) | code (field code) | label (field name)
RECORD_NUMBER | Record number | type (field type) | code (field code) | label (field name)
CREATOR | Created by | type (field type) | code (field code) | label (field name)
CREATED_TIME | Created datetime | type (field type) | code (field code) | label (field name)
MODIFIER | Updated by | type (field type) | code (field code) | label (field name)
UPDATED_TIME | Updated datetime | type (field type) | code (field code) | label (field name)

If the field in `Table Field`, return the response includes `subtableCode`.

## Usage Example

The following example shows how to create a drop-down list of all Date fields that exist in the Kintone App.


**config.html**
```HTML
<select id="select_date_field" name="select_date_field">
    <option value="">-----</option>
</select>
```

**config.js**
```javascript
KintoneConfigHelper.getFields('DATE').then(function(resp) {
    var $dateDropDown = $('#select_date_field');
    for (var i = 0; i < resp.length; i++) {
        var $option = $('<option></option>');
        $option.attr('value', resp[i].code);
        $option.text(resp[i].label);
        $dateDropDown.append($option);
    }
    if (CONF.date) {
        $dateDropDown.val(CONF.date);
    }
});
```

## Limitations
The following Field information are not yet included in the response:
- Labels
- Borders
- Categories
- Status
- Assignee
- Lookups
- Options of fields, such as the list of selectable choices in drop-downs

## Notes
kintone-config-helper uses the [Get Form Fields API](https://developer.kintone.io/hc/en-us/articles/115005509288) and the [Get Form Layout API](https://developer.kintone.io/hc/en-us/articles/115005509068) to obtain field information. The **preview** endpoint is used for these REST APIs, meaning that the Field information obtained with these APIs are field information saved in the pre-live settings of the Kintone App (i.e. before the App settings have been deployed to the live settings). This is to account for users who will go back and forth the Form editor and the Plug-in config page.
