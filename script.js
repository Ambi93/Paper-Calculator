var paperCount = 0;

function addPaper() {
    paperCount++;
    var paperDiv = document.createElement('div');
    paperDiv.id = 'paper' + paperCount;
    paperDiv.innerHTML = `
        <h2>Paper ${paperCount}</h2>
        <input type="text" id="brand${paperCount}" placeholder="Brand Name">
        <input type="text" id="line${paperCount}" placeholder="Line of Paper">
        <input type="number" id="gsm${paperCount}" placeholder="GSM">
        <select onchange="updateFields(this, ${paperCount})" id="paperType${paperCount}">
            <option value="ream">Ream</option>
            <option value="roll">Roll</option>
            <option value="single_sheet">Single Sheet</option>
            <option value="custom_size_sheets">Custom Size Sheets</option>
        </select>
        <input type="number" id="totalCost${paperCount}" placeholder="Total Cost in AUD">
        <select id="size${paperCount}">
            <option value="0.841">A0</option>
            <option value="0.594">A1</option>
            <option value="0.420">A2</option>
            <option value="0.297">A3</option>
            <option value="0.210">A4</option>
            <option value="0.148">A5</option>
        </select>
        <input type="number" id="length${paperCount}" placeholder="Length in meters">
        <input type="number" id="width${paperCount}" placeholder="Width in cm">
        <input type="number" id="sheets${paperCount}" placeholder="Number of Sheets (if ream)">
        <input type="number" id="reams${paperCount}" placeholder="Number of Reams (if ream)">
        <input type="number" id="rolls${paperCount}" placeholder="Number of Rolls (if roll)">
        <input type="number" id="customSheets${paperCount}" placeholder="Number of Custom Size Sheets">
    `;
    document.getElementById('papers').appendChild(paperDiv);
    updateFields(document.getElementById('paperType' + paperCount), paperCount);
}

function updateFields(select, paperNumber) {
    var paperType = select.value;
    var fields = ['size', 'length', 'width', 'sheets', 'reams', 'rolls', 'customSheets'];
    fields.forEach(field => document.getElementById(field + paperNumber).style.display = 'none');

    if (paperType === 'ream') {
        document.getElementById('size' + paperNumber).style.display = 'block';
        document.getElementById('sheets' + paperNumber).style.display = 'block';
        document.getElementById('reams' + paperNumber).style.display = 'block';
    } else if (paperType === 'roll') {
        document.getElementById('length' + paperNumber).style.display = 'block';
        document.getElementById('width' + paperNumber).style.display = 'block';
        document.getElementById('rolls' + paperNumber).style.display = 'block';
    } else if (paperType === 'single_sheet') {
        document.getElementById('size' + paperNumber).style.display = 'block';
        document.getElementById('customSheets' + paperNumber).style.display = 'block';
    } else if (paperType === 'custom_size_sheets') {
        document.getElementById('width' + paperNumber).style.display = 'block';
        document.getElementById('length' + paperNumber).style.display = 'block';
        document.getElementById('customSheets' + paperNumber).style.display = 'block';
    }
}

function calculate() {
    console.log("Calculate function called");
    var results = [];
    for (var i = 1; i <= paperCount; i++) {
        var paperType = document.getElementById('paperType' + i).value;
        var totalCost = parseFloat(document.getElementById('totalCost' + i).value);
        var width = parseFloat(document.getElementById('width' + i).value) / 100; // Convert cm to meters
        var length = parseFloat(document.getElementById('length' + i).value);
        var sheets = parseFloat(document.getElementById('sheets' + i).value);
        var reams = parseFloat(document.getElementById('reams' + i).value);
        var rolls = parseFloat(document.getElementById('rolls' + i).value);
        var customSheets = parseFloat(document.getElementById('customSheets' + i).value);
        var size = parseFloat(document.getElementById('size' + i).value);

        var costPerSheet;

        if (paperType === 'ream') {
            costPerSheet = totalCost / (sheets * reams);
        } else if (paperType === 'roll') {
            costPerSheet = totalCost / (width * length * rolls * 10000); // Assuming total cost is for entire roll
        } else if (paperType === 'single_sheet') {
            costPerSheet = totalCost / customSheets;
        } else if (paperType === 'custom_size_sheets') {
            costPerSheet = totalCost / customSheets;
        }

        costPerSheet = costPerSheet.toFixed(2); // Round to two decimal places
        var brand = document.getElementById('brand' + i).value;
        var line = document.getElementById('line' + i).value;
        results.push(`Paper ${i} (${brand} - ${line}): ${costPerSheet} AUD per sheet`);
    }

    document.getElementById('results').innerHTML = results.join('<br>');
}
