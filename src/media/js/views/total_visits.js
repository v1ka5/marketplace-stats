define('views/total_visits', ['chartutils', 'l10n', 'linechart', 'urls', 'utils', 'z'],
       function(cutils, l10n, linechart, urls, utils, z) {

    var gettext = l10n.gettext;
    var $rangeElms = $('#range x-datepicker');
    var start = '';
    var end = '';
    var interval = 'day';

    start = cutils.getRecentTimeDelta().start;
    end = cutils.getRecentTimeDelta().end;

    function createChart(start, end) {
        linechart.createLineChart({
            tooltipValue: gettext('Visits'),
            yAxis: gettext('Number of Visits')
        },
        {
            url: urls.api.params(
                'total_visits',
                {
                    'start': start,
                    'end': end,
                    'interval': interval
                }
            )
        });
    }

    return function(builder) {
        var chartTitle = gettext('Total Visits');

        builder.start('apps_chart.html', {title: chartTitle}).done(function() {
            createChart(start, end);

            z.page.on('submit', '#rangeform', utils._pd(function() {
                $rangeElms = $('#range x-datepicker');
                start = $rangeElms[0].submitValue;
                end = $rangeElms[1].submitValue;

                createChart(start, end);
            }));
        });

        builder.z('type', 'root');
        builder.z('title', chartTitle);
    };
});
