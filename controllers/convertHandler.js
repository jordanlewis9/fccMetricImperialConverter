/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {
  this.getNum = function(input) {
    // split at alphabetical numbers to extract number
    var result = input.split(/[a-z]/i);
    // take out any improper numbers ie double fractions, or evaluate and convert to number
    if (result[0].match(/.*\/{1,}.*\/{1,}/)) {
      return "invalid number";
    } else {
      result[0] = eval(result[0]) || "";
    }
    // check to see if there is a number. If not, check to see if there is a valid unit.
    if (typeof result[0] !== "number") {
      if (input.match(/^(gal|lbs|l|kg|mi|km)$/i)) {
        result[0] = 1;
      } else {
        result[0] = "invalid number";
      }
    }
    return result[0];
  };

  this.getUnit = function(input) {
    // split at the numbers to extract unit
    var result = input.split(/[0-9]/i);
    // check if unit is valid
    if (!result[result.length - 1].match(/^(gal|lbs|l|kg|mi|km)$/i)) {
      return "invalid unit";
    }
    return result[result.length - 1];
  };

  this.getReturnUnit = function(initUnit) {
    var result;
    initUnit = initUnit.toLowerCase();
    if (initUnit === "gal") {
      result = "l";
    } else if (initUnit === "l") {
      result = "gal";
    } else if (initUnit === "lbs") {
      result = "kg";
    } else if (initUnit === "kg") {
      result = "lbs";
    } else if (initUnit === "mi") {
      result = "km";
    } else if (initUnit === "km") {
      result = "mi";
    } else {
      result = "invalid unit";
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    unit = unit.toLowerCase();
    if (unit === "gal") {
      result = "gallons";
    } else if (unit === "l") {
      result = "liters";
    } else if (unit === "lbs") {
      result = "pounds";
    } else if (unit === "kg") {
      result = "kilograms";
    } else if (unit === "mi") {
      result = "miles";
    } else if (unit === "km") {
      result = "kilometers";
    }

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    initUnit = initUnit.toLowerCase();
    var result;
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      return "invalid number and unit";
    } else if (initNum === "invalid number") {
      return "invalid number";
    } else if (initUnit === "invalid unit") {
      return "invalid unit";
    }
    if (initUnit === "gal") {
      result = initNum * galToL;
    } else if (initUnit === "l") {
      result = initNum / galToL;
    } else if (initUnit === "lbs") {
      result = initNum * lbsToKg;
    } else if (initUnit === "kg") {
      result = initNum / lbsToKg;
    } else if (initUnit === "mi") {
      result = initNum * miToKm;
    } else if (initUnit === "km") {
      result = initNum / miToKm;
    }

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    if (returnNum === "invalid number and unit") {
      result = returnNum;
    } else if (returnNum === "invalid unit") {
      result = returnNum;
    } else if (returnNum === "invalid number") {
      result = returnNum;
    } else {
      var prevUnit = this.spellOutUnit(initUnit);
      var newUnit = this.spellOutUnit(returnUnit);
      var newNum = returnNum.toFixed(5);

      result = `${initNum} ${prevUnit} converts to ${newNum} ${newUnit}`;
    }
    return result;
  };
}

module.exports = ConvertHandler;
