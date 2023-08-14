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
