(function () {
    angular
        .module('app')
        .controller('AsistanceController', [
            AsistanceController
        ]);

    function AsistanceController() {
        var vm = this;

        // TODO: move data to the service
        vm.visitorsChartData = [ {key: 'Hombres', y: 5264}, { key: 'Mujeres', y: 3872} ];

        vm.chartOptions = {
            chart: {
                type: 'pieChart',
                height: 210,
                donut: true,
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                valueFormat: (d3.format(".0f")),
                color: ['rgb(0, 150, 136)', '#E75753'],
                showLabels: false,
                showLegend: false,
                title: 'Faltas',
                margin: { top: -10 }
            }
        };
    }
})();
