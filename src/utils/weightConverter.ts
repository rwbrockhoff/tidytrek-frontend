export default function weightConverter(itemList, outputUnit) {
  if (itemList[0]) {
    return itemList
      .map((item) => {
        const { packItemWeight, packItemUnit } = item;
        // Ensure we always return number type for reducer
        const itemWeight = Number(packItemWeight);

        if (packItemUnit === outputUnit || itemWeight === 0) {
          return itemWeight;
        }
        if (outputUnit === "oz") {
          return convertToOunces(itemWeight, packItemUnit);
        } else if (outputUnit === "lb") {
          return convertToPounds(itemWeight, packItemUnit);
        } else if (outputUnit === "kg") {
          return convertToKilograms(itemWeight, packItemUnit);
        } else if (outputUnit === "g") {
          return convertToGrams(itemWeight, packItemUnit);
        } else return itemWeight;
      })
      .reduce((weight: number, sum: number = 0) => (sum += weight))
      .toFixed(2);
  } else return 0;
}

function convertToOunces(weight, unit) {
  switch (unit) {
    case "oz":
      return weight / 16;
    case "kg":
      return weight * 2.20462;
    case "g":
      return weight * 0.00220462;
    default:
      return weight;
  }
}

function convertToPounds(weight, unit) {
  switch (unit) {
    case "oz":
      return weight / 16;
    case "kg":
      return weight * 2.20462;
    case "g":
      return weight * 0.00220462;
    default:
      return weight;
  }
}

function convertToKilograms(weight, unit) {
  switch (unit) {
    case "oz":
      return weight / 16;
    case "kg":
      return weight * 2.20462;
    case "g":
      return weight * 0.00220462;
    default:
      return weight;
  }
}

function convertToGrams(weight, unit) {
  switch (unit) {
    case "oz":
      return weight / 16;
    case "kg":
      return weight * 2.20462;
    case "g":
      return weight * 0.00220462;
    default:
      return weight;
  }
}
