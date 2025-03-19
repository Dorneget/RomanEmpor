import * as d3 from 'd3';

// Emperor data
const emperors = [
  { name: "Augustus", start: -27, end: 14, deathCause: "natural", dynasty: "julio-claudian" },
  { name: "Tiberius", start: 14, end: 37, deathCause: "natural", dynasty: "julio-claudian" },
  { name: "Caligula", start: 37, end: 41, deathCause: "assassination", dynasty: "julio-claudian" },
  { name: "Claudius", start: 41, end: 54, deathCause: "assassination", dynasty: "julio-claudian" },
  { name: "Nero", start: 54, end: 68, deathCause: "suicide", dynasty: "julio-claudian" },
  { name: "Galba", start: 68, end: 69, deathCause: "assassination", dynasty: "year-of-four-emperors" },
  { name: "Otho", start: 69, end: 69, deathCause: "suicide", dynasty: "year-of-four-emperors" },
  { name: "Vitellius", start: 69, end: 69, deathCause: "assassination", dynasty: "year-of-four-emperors" },
  { name: "Vespasian", start: 69, end: 79, deathCause: "natural", dynasty: "flavian" },
  { name: "Titus", start: 79, end: 81, deathCause: "natural", dynasty: "flavian" },
  { name: "Domitian", start: 81, end: 96, deathCause: "assassination", dynasty: "flavian" },
  { name: "Nerva", start: 96, end: 98, deathCause: "natural", dynasty: "nerva-antonine" },
  { name: "Trajan", start: 98, end: 117, deathCause: "natural", dynasty: "nerva-antonine" },
  { name: "Hadrian", start: 117, end: 138, deathCause: "natural", dynasty: "nerva-antonine" },
  { name: "Antoninus Pius", start: 138, end: 161, deathCause: "natural", dynasty: "nerva-antonine" },
  { name: "Marcus Aurelius", start: 161, end: 180, deathCause: "natural", dynasty: "nerva-antonine" },
  { name: "Lucius Verus", start: 161, end: 169, deathCause: "natural", dynasty: "nerva-antonine" },
  { name: "Commodus", start: 180, end: 192, deathCause: "assassination", dynasty: "nerva-antonine" },
  { name: "Pertinax", start: 193, end: 193, deathCause: "assassination", dynasty: "year-of-five-emperors" },
  { name: "Didius Julianus", start: 193, end: 193, deathCause: "execution", dynasty: "year-of-five-emperors" },
  { name: "Septimius Severus", start: 193, end: 211, deathCause: "natural", dynasty: "severan" },
  { name: "Caracalla", start: 211, end: 217, deathCause: "assassination", dynasty: "severan" },
  { name: "Geta", start: 211, end: 212, deathCause: "assassination", dynasty: "severan" },
  { name: "Macrinus", start: 217, end: 218, deathCause: "execution", dynasty: "severan" },
  { name: "Elagabalus", start: 218, end: 222, deathCause: "assassination", dynasty: "severan" },
  { name: "Severus Alexander", start: 222, end: 235, deathCause: "assassination", dynasty: "severan" },
  { name: "Maximinus I", start: 235, end: 238, deathCause: "assassination", dynasty: "crisis" },
  { name: "Gordian I", start: 238, end: 238, deathCause: "suicide", dynasty: "crisis" },
  { name: "Gordian II", start: 238, end: 238, deathCause: "battle", dynasty: "crisis" },
  { name: "Pupienus", start: 238, end: 238, deathCause: "assassination", dynasty: "crisis" },
  { name: "Balbinus", start: 238, end: 238, deathCause: "assassination", dynasty: "crisis" },
  { name: "Gordian III", start: 238, end: 244, deathCause: "unknown", dynasty: "crisis" },
  { name: "Philip I", start: 244, end: 249, deathCause: "battle", dynasty: "crisis" },
  { name: "Trajan Decius", start: 249, end: 251, deathCause: "battle", dynasty: "crisis" },
  { name: "Hostilian", start: 251, end: 251, deathCause: "natural", dynasty: "crisis" },
  { name: "Trebonianus Gallus", start: 251, end: 253, deathCause: "assassination", dynasty: "crisis" },
  { name: "Aemilian", start: 253, end: 253, deathCause: "assassination", dynasty: "crisis" },
  { name: "Valerian", start: 253, end: 260, deathCause: "captivity", dynasty: "crisis" },
  { name: "Gallienus", start: 253, end: 268, deathCause: "assassination", dynasty: "crisis" },
  { name: "Claudius Gothicus", start: 268, end: 270, deathCause: "natural", dynasty: "crisis" },
  { name: "Quintillus", start: 270, end: 270, deathCause: "unknown", dynasty: "crisis" },
  { name: "Aurelian", start: 270, end: 275, deathCause: "assassination", dynasty: "crisis" },
  { name: "Tacitus", start: 275, end: 276, deathCause: "natural", dynasty: "crisis" },
  { name: "Probus", start: 276, end: 282, deathCause: "assassination", dynasty: "crisis" },
  { name: "Carus", start: 282, end: 283, deathCause: "natural", dynasty: "crisis" },
  { name: "Diocletian", start: 284, end: 305, deathCause: "natural", dynasty: "tetrarchy" },
  { name: "Maximian", start: 286, end: 310, deathCause: "suicide", dynasty: "tetrarchy" },
  { name: "Constantius I", start: 305, end: 306, deathCause: "natural", dynasty: "tetrarchy" },
  { name: "Galerius", start: 305, end: 311, deathCause: "natural", dynasty: "tetrarchy" },
  { name: "Constantine I", start: 306, end: 337, deathCause: "natural", dynasty: "constantinian" },
  { name: "Maxentius", start: 306, end: 312, deathCause: "battle", dynasty: "tetrarchy" },
  { name: "Maximinus II", start: 310, end: 313, deathCause: "unknown", dynasty: "tetrarchy" },
  { name: "Licinius I", start: 308, end: 324, deathCause: "execution", dynasty: "tetrarchy" },
  { name: "Constantine II", start: 337, end: 340, deathCause: "battle", dynasty: "constantinian" },
  { name: "Constantius II", start: 337, end: 361, deathCause: "natural", dynasty: "constantinian" },
  { name: "Constans", start: 337, end: 350, deathCause: "assassination", dynasty: "constantinian" },
  { name: "Julian", start: 361, end: 363, deathCause: "battle", dynasty: "constantinian" },
  { name: "Jovian", start: 363, end: 364, deathCause: "natural", dynasty: "constantinian" },
  { name: "Valentinian I", start: 364, end: 375, deathCause: "natural", dynasty: "valentinian" },
  { name: "Valens", start: 364, end: 378, deathCause: "battle", dynasty: "valentinian" },
  { name: "Gratian", start: 375, end: 383, deathCause: "assassination", dynasty: "valentinian" },
  { name: "Valentinian II", start: 375, end: 392, deathCause: "suicide", dynasty: "valentinian" },
  { name: "Theodosius I", start: 379, end: 395, deathCause: "natural", dynasty: "theodosian" }
];

const deathColors = {
  "assassination": "#B22222", // Firebrick
  "natural": "#4682B4", // Steel Blue
  "battle": "#8B4513", // Saddle Brown
  "suicide": "#4B0082", // Indigo
  "execution": "#2F4F4F", // Dark Slate Gray
  "unknown": "#708090", // Slate Gray
  "captivity": "#CD853F"  // Peru
};

const periodRanges = {
  "julio-claudian": { start: -27, end: 68 },
  "flavian": { start: 69, end: 96 },
  "nerva-antonine": { start: 96, end: 192 },
  "severan": { start: 193, end: 235 },
  "crisis": { start: 235, end: 284 },
  "tetrarchy": { start: 284, end: 363 },
  "valentinian": { start: 364, end: 395 }
};

// Initialize the timeline
function renderTimeline(filteredEmperors) {
  const timeline = document.getElementById('emperorTimeline');
  timeline.innerHTML = '';

  const totalYears = 422; // -27 to 395 = 422 years
  const timelineWidth = timeline.clientWidth;
  const yearWidth = timelineWidth / totalYears;

  filteredEmperors.forEach(emperor => {
    const emperorDiv = document.createElement('div');
    emperorDiv.className = 'emperor';

    // Calculate position and width
    const startOffset = (emperor.start + 27) * yearWidth;
    const endOffset = (emperor.end + 27) * yearWidth;
    const width = endOffset - startOffset;

    // Create name label
    const nameSpan = document.createElement('span');
    nameSpan.className = 'emperor-name';
    nameSpan.textContent = emperor.name;
    emperorDiv.appendChild(nameSpan);

    // Create reign bar
    const reignBar = document.createElement('div');
    reignBar.className = 'reign-bar';
    reignBar.style.left = '0';
    reignBar.style.width = width + 'px';
    emperorDiv.appendChild(reignBar);

    // Create death marker
    const deathMarker = document.createElement('div');
    deathMarker.className = 'death-marker';
    deathMarker.style.left = width - 10 + 'px';
    deathMarker.style.backgroundColor = deathColors[emperor.deathCause];
    emperorDiv.appendChild(deathMarker);

    // Set width and position of the emperor div
    emperorDiv.style.width = width + 'px';
    emperorDiv.style.marginLeft = startOffset + 'px';

    // Add tooltip on hover
    emperorDiv.addEventListener('mouseover', (e) => {
      const tooltip = document.getElementById('tooltip');
      const reignYears = emperor.end - emperor.start;
      tooltip.innerHTML = `
        <strong>${emperor.name}</strong><br>
        Reign: ${emperor.start < 0 ? Math.abs(emperor.start) + ' BCE' : emperor.start + ' CE'} to ${emperor.end} CE (${reignYears} years)<br>
        Death: ${emperor.deathCause.charAt(0).toUpperCase() + emperor.deathCause.slice(1)}
      `;
      tooltip.style.display = 'block';
      tooltip.style.left = e.pageX + 10 + 'px';
      tooltip.style.top = e.pageY + 10 + 'px';
    });

    emperorDiv.addEventListener('mouseout', () => {
      document.getElementById('tooltip').style.display = 'none';
    });

    timeline.appendChild(emperorDiv);
  });
}

// Create death cause chart
async function renderDeathChart(filteredEmperors) {
  console.log("renderDeathChart called");
  console.log("Filtered emperors for death chart:", filteredEmperors);

  try {
    console.log("Checking if d3 is defined after import in renderDeathChart:", d3);

    if (!d3) {
      console.error("D3 is undefined after dynamic import in renderDeathChart!");
      return;
    }

    const deathCounts = {
      assassination: 0,
      natural: 0,
      battle: 0,
      suicide: 0,
      execution: 0,
      unknown: 0,
      captivity: 0
    };

    filteredEmperors.forEach(emperor => {
      deathCounts[emperor.deathCause]++;
    });

    const chartDiv = document.getElementById('deathCauseChart');
    console.log("Death cause chart div:", chartDiv);
    chartDiv.innerHTML = '';

    // Create container to hold both chart and table
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.width = '100%';

    // Create pie chart without labels
    const chartContainer = document.createElement('div');
    chartContainer.style.width = '100%';
    chartContainer.style.height = '250px';
    chartContainer.style.position = 'relative';
    chartContainer.style.display = 'flex';
    chartContainer.style.justifyContent = 'center';

    const validDeathCauses = Object.entries(deathCounts)
      .filter(([_, value]) => value > 0)
      .sort((a, b) => b[1] - a[1]); // Sort by count in descending order

    // Set fixed dimensions for SVG
    const svgWidth = 300;
    const svgHeight = 250;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;
    const radius = Math.min(centerX, centerY) - 40;

    const svg = d3.select(chartContainer) // Use d3.select directly
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .append('g')
      .attr('transform', `translate(${centerX}, ${centerY})`);
    console.log("SVG element created for death chart:", svg); // Log SVG element

    const pie = d3.pie() // Use d3.pie directly
      .value(d => d[1])
      .sort(null);

    const arc = d3.arc() // Use d3.arc directly
      .innerRadius(0)
      .outerRadius(radius);

    // Create pie slices
    const slices = svg.selectAll('path')
      .data(pie(validDeathCauses))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => deathColors[d.data[0]])
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7)
      .on('mouseover', function(event, d) {
        d3.select(this).style('opacity', 1); // Use d3.select directly
        const percent = Math.round((d.data[1] / filteredEmperors.length) * 100);
        const tooltip = document.getElementById('tooltip');
        tooltip.innerHTML = `
          <strong>${d.data[0].charAt(0).toUpperCase() + d.data[0].slice(1)}</strong><br>
          ${d.data[1]} emperors (${percent}%)
        `;
        tooltip.style.display = 'block';
        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY + 10 + 'px';
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 0.7); // Use d3.select directly
        document.getElementById('tooltip').style.display = 'none';
      });

    container.appendChild(chartContainer);

    // Create table for death causes
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.marginTop = '20px';
    table.style.fontFamily = "'Times New Roman', Times, serif";
    table.style.color = "#f0e68c";

    // Create header row
    const headerRow = document.createElement('tr');
    const headers = ['Death Cause', 'Count', 'Percentage'];

    headers.forEach(headerText => {
      const header = document.createElement('th');
      header.textContent = headerText;
      header.style.padding = '8px';
      header.style.borderBottom = '1px solid #f0e68c';
      header.style.textAlign = 'left';
      header.style.color = 'var(--imperial-gold)';
      headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    // Add data rows
    validDeathCauses.forEach(([cause, count]) => {
      const row = document.createElement('tr');
      row.style.transition = 'background-color 0.3s';

      row.addEventListener('mouseover', function(event) {
        this.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';

        // Also highlight the corresponding pie slice
        svg.selectAll('path')
          .filter(d => d.data[0] === cause)
          .style('opacity', 1);

        const percent = Math.round((count / filteredEmperors.length) * 100);
        const tooltip = document.getElementById('tooltip');
        tooltip.innerHTML = `
          <strong>${cause.charAt(0).toUpperCase() + cause.slice(1)}</strong><br>
          ${count} emperors (${percent}%)
        `;
        tooltip.style.display = 'block';
        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY + 10 + 'px';
      });

      row.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'transparent';

        // Reset pie slice opacity
        svg.selectAll('path')
          .style('opacity', 0.7);

        document.getElementById('tooltip').style.display = 'none';
      });

      // First column with color indicator + death cause
      const deathCauseCell = document.createElement('td');

      // Add color indicator
      const colorBox = document.createElement('div');
      colorBox.style.display = 'inline-block';
      colorBox.style.width = '20px';
      colorBox.style.height = '20px';
      colorBox.style.backgroundColor = deathColors[cause];
      colorBox.style.marginRight = '10px';
      colorBox.style.verticalAlign = 'middle';
      deathCauseCell.appendChild(colorBox);

      // Add cause name
      const causeName = document.createTextNode(cause.charAt(0).toUpperCase() + cause.slice(1));
      deathCauseCell.appendChild(causeName);
      deathCauseCell.style.padding = '8px';
      row.appendChild(deathCauseCell);

      // Count cell
      const countCell = document.createElement('td');
      countCell.textContent = count;
      countCell.style.padding = '8px';
      row.appendChild(countCell);

      // Percentage cell
      const percentCell = document.createElement('td');
      const percent = Math.round((count / filteredEmperors.length) * 100);
      percentCell.textContent = percent + '%';
      percentCell.style.padding = '8px';
      row.appendChild(percentCell);

      table.appendChild(row);
    });

    container.appendChild(table);
    chartDiv.appendChild(container);
  } catch (error) {
    console.error("Error loading d3 in renderDeathChart:", error);
  }
}

// Create reign length chart
function renderReignLengthChart(filteredEmperors) {
  console.log("Checking if d3 is defined in renderReignLengthChart:", d3); // ADDED CONSOLE LOG HERE
  console.log("renderReignLengthChart called");
  console.log("Filtered emperors for reign chart:", filteredEmperors);

  const chartDiv = document.getElementById('reignLengthChart');
  console.log("Reign length chart div:", chartDiv);
  chartDiv.innerHTML = '';

  // Calculate reign lengths
  const reignLengths = filteredEmperors.map(emperor => {
    return {
      name: emperor.name,
      length: emperor.end - emperor.start,
      deathCause: emperor.deathCause
    };
  }).sort((a, b) => a.length - b.length);
  console.log("Reign lengths data:", reignLengths);

    // const d3 = window.d3; // REMOVED THIS LINE
    console.log("Checking if d3 is defined after import in renderReignLengthChart:", d3);

    if (!d3) {
      console.error("D3 is undefined after dynamic import in renderReignLengthChart!");
      return;
    }

    // Create SVG for bar chart
    const margin = {top: 50, right: 30, bottom: 90, left: 60};
    const width = chartDiv.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartDiv)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    console.log("SVG element created for reign chart:", svg);

    // X axis
    const x = d3.scaleLinear()
      .domain([0, d3.max(reignLengths, d => d.length) + 1])
      .range([0, width]);

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // X axis label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('fill', 'var(--imperial-gold)')
      .text('Reign Length (Years)');

    // Y axis (count)
    const histogram = d3.histogram()
      .value(d => d.length)
      .domain(x.domain())
      .thresholds(x.ticks(20));

    const bins = histogram(reignLengths);

    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length) + 1])
      .range([height, 0]);

    svg.append('g')
      .call(d3.axisLeft(y));

    // Add bars
    svg.selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
      .attr('x', d => x(d.x0))
      .attr('y', d => y(d.length))
      .attr('width', d => Math.max(0, x(d.x1) - x(d.x0) - 1))
      .attr('height', d => height - y(d.length))
      .style('fill', '#D4AF37')
      .style('opacity', 0.7)
      .on('mouseover', function(event, d) {
        d3.select(this).style('opacity', 1);

        const tooltip = document.getElementById('tooltip');
        tooltip.innerHTML = `
          <strong>Reign Length: ${d.x0} to ${d.x1} years</strong><br>
          Number of Emperors: ${d.length}<br>
          ${d.map(emperor => emperor.name).join(', ')}
        `;
        tooltip.style.display = 'block';
        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY + 10 + 'px';
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 0.7);
        document.getElementById('tooltip').style.display = 'none';
      });
}

// Filter functions
function filterEmperors() {
  const deathFilter = document.getElementById('deathFilter').value;
  const periodFilter = document.getElementById('periodFilter').value;
  const startYear = parseInt(document.getElementById('timeSliderStart').value);
  const endYear = parseInt(document.getElementById('timeSliderEnd').value);

  let filtered = [...emperors];

  // 1. Apply Time Range Filter FIRST based on sliders
  filtered = filtered.filter(emperor => {
    const emperorStart = emperor.start;
    const emperorEnd = emperor.end;
    const sliderStart = startYear;
    const sliderEnd = endYear;

    return (
      (emperorStart >= sliderStart && emperorStart <= sliderEnd) ||
      (emperorEnd >= sliderStart && emperorEnd <= sliderEnd) ||
      (emperorStart <= sliderStart && emperorEnd >= sliderEnd)
    );
  });

  // 2. Apply Dynasty/Period filter SECOND if a period is selected (and AFTER time range filter)
  if (periodFilter !== 'all') {
    filtered = filtered.filter(emperor => emperor.dynasty === periodFilter || emperor.dynasty.includes(periodFilter));
  }

  // 3. Apply Death Cause Filter LAST
  if (deathFilter !== 'all') {
    filtered = filtered.filter(emperor => emperor.deathCause === deathFilter);
  }


  // Update time range label
  const timeRangeLabel = document.getElementById('timeRangeLabel');
  timeRangeLabel.textContent = `${startYear < 0 ? Math.abs(startYear) + ' BCE' : startYear + ' CE'} - ${endYear} CE`;

  // Update stats
  updateStats(filtered);

  return filtered;
}

// Update statistics
function updateStats(filteredEmperors) {
  document.getElementById('totalEmperors').textContent = filteredEmperors.length;

  // Calculate average reign
  const totalReignYears = filteredEmperors.reduce((sum, emp) => sum + (emp.end - emp.start), 0);
  const avgReign = filteredEmperors.length > 0 ? Math.round(totalReignYears / filteredEmperors.length) : 0;
  document.getElementById('avgReign').textContent = avgReign;

  // Calculate assassination percentage
  const assassinations = filteredEmperors.filter(emp => emp.deathCause === 'assassination').length;
  const assassinationPercent = filteredEmperors.length > 0 ? Math.round((assassinations / filteredEmperors.length) * 100) : 0;
  document.getElementById('assassinationPercent').textContent = assassinationPercent + '%';

  // Find longest reign
  const longestReign = filteredEmperors.length > 0 ?
    Math.max(...filteredEmperors.map(emp => emp.end - emp.start)) : 0;
  document.getElementById('longestReign').textContent = longestReign;
}

// Update all visualisations
async function updateVisualisations() {
  const filtered = filterEmperors();
  renderTimeline(filtered);
  await renderDeathChart(filtered);
  await renderReignLengthChart(filtered);
}

// Event listeners
document.getElementById('deathFilter').addEventListener('change', updateVisualisations);
document.getElementById('periodFilter').addEventListener('change', function() {
  const periodFilter = this.value;

  // If a specific period is selected, update the time sliders
  if (periodFilter !== 'all') {
    const period = periodRanges[periodFilter];
    document.getElementById('timeSliderStart').value = period.start;
    document.getElementById('timeSliderEnd').value = period.end;
  } else {
    // Reset sliders to default values when "All Periods" is selected
    document.getElementById('timeSliderStart').value = -27;
    document.getElementById('timeSliderEnd').value = 395;
  }

  updateVisualisations();
});

document.getElementById('timeSliderStart').addEventListener('input', function() {
  const startValue = parseInt(this.value);
  const endValue = parseInt(document.getElementById('timeSliderEnd').value);

  // Ensure start doesn't go beyond end
  if (startValue > endValue) {
    this.value = endValue;
  }

  updateVisualisations();
});

document.getElementById('timeSliderEnd').addEventListener('input', function() {
  const endValue = parseInt(this.value);
  const startValue = parseInt(document.getElementById('timeSliderStart').value);

  // Ensure end doesn't go before start
  if (endValue < startValue) {
    this.value = startValue;
  }

  updateVisualisations();
});

// Initialize visualisations
window.addEventListener('DOMContentLoaded', updateVisualisations);
window.addEventListener('resize', updateVisualisations);
