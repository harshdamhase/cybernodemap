document.addEventListener('DOMContentLoaded', function () {
    var svg = d3.select('svg');
    var tooltip = d3.select('.tooltip');

    var boundingBox = svg.node().getBoundingClientRect();
    var width = boundingBox.width;
    var height = boundingBox.height;

    var simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(function (d) { return d.id; }).distance(130))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collide', d3.forceCollide().radius(20))
        .force('label', d3.forceManyBody().strength(-100));

    svg.attr('transform', 'translate(0, 0) scale(1)');

    var link = svg.selectAll('line')
        .data(links)
        .enter()
        .append('line');

    var node = svg.selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('r', 12)
        .attr('fill', function (d) { return getColor(d.id); })
        .on('click', function (event, d) {
            if (!d.dragged) {
                handleNodeClick(d);
            }
        })
        .on('touchstart', function (event, d) {
            d3.event.preventDefault();
            d.touched = true;
        })
        .on('touchmove', function (event, d) {
            d3.event.preventDefault();
            d.dragged = true;
        })
        .on('touchend', function (event, d) {
            d3.event.preventDefault();
            if (d.touched && !d.dragged) {
                handleNodeClick(d);
            }
            d.touched = false;
            d.dragged = false;
        })
        .on('mouseover', function (event, d) {
            if (d.tooltip.trim() !== '') {
                updateTooltipPosition(event);
                showTooltip(event, d.tooltip);
                highlightNodes(d.id);
                d3.select(this).transition().duration(200)
                    .attr('r', 16);
            }
        })
        .on('mouseout', function () {
            hideTooltip();
            d3.select(this).transition().duration(200)
                .attr('r', 12);
        })
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

    var label = svg.selectAll('text')
        .data(nodes)
        .enter()
        .append('text')
        .text(function (d) { return d.label; })
        .attr('dy', -18)
        .style('pointer-events', 'none');

    simulation.on('tick', function () {
        link.attr('x1', function (d) { return d.source.x; })
            .attr('y1', function (d) { return d.source.y; })
            .attr('x2', function (d) { return d.target.x; })
            .attr('y2', function (d) { return d.target.y; });

        node.attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; });

        label.attr('x', function (d) { return d.x; })
            .attr('y', function (d) { return d.y; });
    });

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
        d.dragged = true;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        d.dragged = false;
    }

    function getColor(id) {
        return '#444';
    }

    function handleNodeClick(d) {
        if (d.id !== 'start' && d.id !== 'end') {
            window.location.href = d.contentUrl;
        }
    }

    function showTooltip(event, text) {
        tooltip.html(text)
            .style('opacity', 1)
            .style('left', event.pageX + 'px')
            .style('top', (event.pageY - 20) + 'px');
    }

    function updateTooltipPosition(event) {
        tooltip.transition().duration(200)
            .style('left', event.pageX + 'px')
            .style('top', (event.pageY - 20) + 'px');
    }

    function hideTooltip() {
        tooltip.transition().duration(200)
            .style('opacity', 0);
    }
});




document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.addEventListener('selectstart', function (e) {
    e.preventDefault();
});

document.addEventListener('copy', function (e) {
    e.preventDefault();
});