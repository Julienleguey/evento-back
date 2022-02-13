const submarineData = require("../../public/submarineData.json");

class SubmarineDiagnostic {
  constructor() {
    this.dataLength = submarineData.length;
    this.dataLineLength = submarineData[0].length;
    this.bitsOrderedByIndex = Array.from(Array(this.dataLineLength));
    this.gammaRateInBits = "";
    this.epsilonRateInBits = "";
    this.gammaRateInDecimals;
    this.epsilonRateInDecimals;
  }

  execute() {
    console.log("RUNNING DIAGNOSTIC");
    this.createEmptyArrayForEachBit();
    this.orderBitsByIndex();
    this.getRatesInBits();
    this.getRatesInDecimals();
    
    const powerConsumption = this.getPowerConsumption();
    return `The submarine's power consumption is ${powerConsumption}`;
  }

  /** **********************
  PRIVATE METHODS
  *********************** */

  createEmptyArrayForEachBit() {
    this.bitsOrderedByIndex.forEach((v, index) => { this.bitsOrderedByIndex[index] = [] });
  }

  orderBitsByIndex() {
    submarineData.forEach((dataLine) => {
      this.bitsOrderedByIndex.forEach((v, index) => {
        this.bitsOrderedByIndex[index].push(dataLine[index]);
      });
    });
  }

  getRatesInBits() {
    this.bitsOrderedByIndex.forEach((bits) => {
      const zeroCount = bits.filter((bit) => bit === "0").length;

      if (zeroCount > (this.dataLength / 2)) {
        this.gammaRateInBits += "0";
        this.epsilonRateInBits += "1";
      } else {
        this.gammaRateInBits += "1";
        this.epsilonRateInBits += "0";
      }
    });
  }

  getRatesInDecimals() {
    this.gammaRateInDecimals = parseInt(this.gammaRateInBits, 2);
    this.epsilonRateInDecimals = parseInt(this.epsilonRateInBits, 2);
  }

  getPowerConsumption() {
    return this.gammaRateInDecimals * this.epsilonRateInDecimals;
  }
}

module.exports = SubmarineDiagnostic;
