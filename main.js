var property = new Array();
var unit = new Array();
var fact = new Array();

property[0] = "Area";
unit[0] = new Array(
    "Square meter (m^2)",
    "Acre (acre)",
    "Hectare",
    "Square centimeter(cm^2)",
    "Square kilometer(km^)",
    "Square foot (ft^2)",
    "Square inch (in^2)",
    "Square mile (mi^2)",
    "Square yard (yd^2)"
);
fact[0] = new Array(1, 4046.856, 10000, 0.0001, 1000000, 9.290304e-2, 6.4516e-4, 2589988, 0.8361274);

property[1] = "Length";
unit[1] = new Array(
    "Meter (m)",
    "Angstrom (A')",
    "Centimeter (cm)",
    "Kilometer (km)",
    "Foot (ft)",
    "Inch (in)",
    "Micrometer (mu-m)",
    "Millimeter (mm)",
    "Nanometer (nm)",
    "Mile (nautical)",
    "Yard (yd)"
);
fact[1] = new Array(1, 1e-10, 0.01, 1000, 0.3048, 0.0254, 0.000001, 0.001, 1e-9, 1852, 0.9144);

property[2] = "Weight";
unit[2] = new Array(
    "Kilogram (kg)",
    "Gram (g)",
    "Milligram (mg)",
    "Microgram (mu-gr)",
    "Carat (metric)(ct)",
    "Pound mass (lbs)",
    "Ounce mass (oz)",
    "Ton (metric)",
    "Tonne"
);
fact[2] = new Array(1, 0.001, 1e-6, 0.000000001, 0.0002, 0.4535924, 0.02834952, 1000, 1000);

property[3] = "Temperature";
unit[3] = new Array(
    "Degrees Celsius ('C)",
    "Degrees Fahrenheit ('F)",
    "Degrees Kelvin ('K)",
    "Degrees Rankine ('R)"
);
fact[3] = new Array(1, 0.555555555555, 1, 0.555555555555);
tempIncrement = new Array(0, -32, -273.15, -491.67);

property[4] = "Time";
unit[4] = new Array(
    "Second (sec)",
    "Day (mean solar)",
    "Day (sidereal)",
    "Hour (mean solar)",
    "Hour (sidereal)",
    "Minute (mean solar)",
    "Minute (sidereal)",
    "Month (mean calendar)",
    "Second (sidereal)",
    "Year (calendar)",
    "Year (tropical)",
    "Year (sidereal)"
);
fact[4] = new Array(1, 8.64e4, 86164.09, 3600, 3590.17, 60, 60, 2628000, 0.9972696, 31536000, 31556930, 31558150);

//  Functions

function UpdateUnitMenu(propMenu, unitMenu) {
    
    var i;
    i = propMenu.selectedIndex;
    FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray) {
   
    var i;
    myMenu.length = myArray.length;
    for (i = 0; i < myArray.length; i++) {
        myMenu.options[i].text = myArray[i];
    }
}

function CalculateUnit(sourceForm, targetForm) {
   
    var sourceValue = sourceForm.unit_input.value;

    sourceValue = parseFloat(sourceValue);
    if (!isNaN(sourceValue) || sourceValue == 0) {
      
        sourceForm.unit_input.value = sourceValue;
        ConvertFromTo(sourceForm, targetForm);
    }
}

function ConvertFromTo(sourceForm, targetForm) {
   
    var propIndex;
    var sourceIndex;
    var sourceFactor;
    var targetIndex;
    var targetFactor;
    var result;

  
    propIndex = document.prop_form.the_menu.selectedIndex;

    
    sourceIndex = sourceForm.unit_menu.selectedIndex;
    sourceFactor = fact[propIndex][sourceIndex];

    targetIndex = targetForm.unit_menu.selectedIndex;
    targetFactor = fact[propIndex][targetIndex];

    result = sourceForm.unit_input.value;
   
    if (property[propIndex] == "Temperature") {
        result = parseFloat(result) + tempIncrement[sourceIndex];
    }
    result = result * sourceFactor;

    
    result = result / targetFactor;
    
    if (property[propIndex] == "Temperature") {
        result = parseFloat(result) - tempIncrement[targetIndex];
    }

    
    targetForm.unit_input.value = result;
}


window.onload = function (e) {
    FillMenuWithArray(document.prop_form.the_menu, property);
    UpdateUnitMenu(document.prop_form.the_menu, document.form_A.unit_menu);
    UpdateUnitMenu(document.prop_form.the_menu, document.form_B.unit_menu);
};

document
    .getElementByClass("numbersonly")
    .addEventListener("keydown", function (e) {
        var key = e.keyCode ? e.keyCode : e.which;

        if (
            !(
                (
                    [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
                    (key == 65 && (e.ctrlKey || e.metaKey)) || // Select All
                    (key == 67 && (e.ctrlKey || e.metaKey)) || // Copy
                    (key == 86 && (e.ctrlKey || e.metaKey)) || // Paste
                    (key >= 35 && key <= 40) || // End, Home, Arrows
                    (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) || // Numeric Keys
                    (key >= 96 && key <= 105)(
                        // Numpad
                        key == 190
                    )
                ) // Numpad
            )
        )
            e.preventDefault();
    });