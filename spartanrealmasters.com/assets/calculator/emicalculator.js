function U(a) {
    return Base64.encode(unescape(encodeURIComponent(a)))
}

function J(a) {
    p = a, jQuery("#loanproduct").val(p), "active" != jQuery("li#" + p).attr("class") && jQuery("li#" + p).addClass("active").siblings().removeClass("active"), jQuery("ul.loanproduct-nav li").click(function() {
        return "active" != jQuery(this).attr("class") && (jQuery(this).addClass("active").siblings().removeClass("active"), p = jQuery(this).attr("id"), jQuery("#loanproduct").val(p), "home-loan" == p ? O("Home Loan Amount", 2e7, 1e5, 5e6, 20, 10.5, 30, .5, 240) : "personal-loan" == p ? O("Personal Loan Amount", 15e5, 1e4, 35e4, 25, 17.5, 5, .25, 36) : "car-loan" == p && O("Car Loan Amount", 2e6, 1e4, 4e5, 20, 12.5, 7, .25, 60), T()), !1
    })
}

function P() {
    jQuery("#loanamount").blur(function() {
        jQuery("#loanamount").val(Globalize.format(Math.round(jQuery("#loanamount").val().replace(/[^\d\.]/g, "")), "n", "en-IN"))
    }), jQuery("#loaninterest").blur(function() {
        jQuery("#loaninterest").val(Math.round(1e3 * jQuery("#loaninterest").val().replace(/[^\d\.]/g, "")) / 1e3)
    }), jQuery("#loanterm").blur(function() {
        jQuery("#loanterm").val(jQuery("#emicalculatorform input[name='loantenure']")[0].checked ? Math.round(Math.round(12 * jQuery("#loanterm").val().replace(/[^\d\.]/g, "")) / 12 * 100) / 100 : jQuery("#loanterm").val().replace(/[^\d\.]/g, ""))
    })
}

function M(a) {
    var e = jQuery("#emicalculatorform").find(":input").get();
    return "object" != typeof a ? (a = {}, jQuery.each(e, function() {
        this.name && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type)) && "loandata" != this.name && (a[this.name] = jQuery(this).val())
    }), a) : (jQuery.each(e, function() {
        this.name && a[this.name] ? "checkbox" == this.type || "radio" == this.type ? (jQuery(this).prop("checked", a[this.name] == jQuery(this).val()), a[this.name] == jQuery(this).val() ? (jQuery(this).parent(".btn").addClass("active"), jQuery(this).parent(".btn").siblings("input[name=" + this.name + "]").removeClass("active")) : (jQuery(this).parent(".btn").removeClass("active"), jQuery(this).parent(".btn").siblings("input[name=" + this.name + "]").addClass("active"))) : jQuery(this).val(a[this.name]) : "checkbox" == this.type && jQuery(this).prop("checked", !1)
    }), jQuery(this))
}

function K() {
    jQuery("#startmonthyear").attr("readonly", !0), jQuery("#startmonthyear").datepicker({
        format: "M yyyy",
        minViewMode: 1,
        autoclose: !0
    }).on("changeDate", function() {
        jQuery(this).datepicker("getDate").toDateString() != m.c.toDateString() && (m.c = jQuery(this).datepicker("getDate"), T())
    }).on("hide", function() {
        jQuery("#startmonthyear").blur()
    }), m.c = new Date, jQuery("#startmonthyear").datepicker("setDate", m.c)
}

function L() {
    jQuery("#loanamount").unbind("change"), jQuery("#loaninterest").unbind("change"), jQuery("#loanterm").unbind("change"), jQuery("#emicalculatorform input[name='loantenure']").unbind("change"), jQuery("#emicalculatorform input[name='emischeme']").unbind("change")
}

function V(a, e, s, n, l) {
    q = jQuery("#loanamountslider").slider({
        range: "min",
        value: parseInt(jQuery("#loanamount").val().replace(/[^\d\.]/g, "")),
        min: 0,
        max: a,
        step: e,
        slide: function(a, e) {
            jQuery("#loanamount").val(Globalize.format(Math.round(e.value), "n", "en-IN"))
        },
        change: function(a) {
            a.originalEvent && T()
        }
    }), q.slider("value", q.slider("value")), r = jQuery("#loaninterestslider").slider({
        range: "min",
        value: parseFloat(jQuery("#loaninterest").val()),
        min: 5,
        max: s,
        step: .25,
        slide: function(a, e) {
            jQuery("#loaninterest").val(e.value)
        },
        change: function(a) {
            a.originalEvent && T()
        }
    }), r.slider("value", r.slider("value")), a = parseInt(jQuery("#loanterm").val()), jQuery("#emicalculatorform input[name='loantenure']")[1].checked && (a = parseInt(jQuery("#loanterm").val()) / 12), t = jQuery("#loantermslider").slider({
        range: "min",
        value: a,
        min: 0,
        max: n,
        step: l,
        slide: function(a, e) {
            jQuery("#loanterm").val(jQuery("#emicalculatorform input[name='loantenure']")[0].checked ? e.value : 12 * e.value)
        },
        change: function(a) {
            a.originalEvent && T()
        }
    }), t.slider("value", t.slider("value"))
}

function N() {
    jQuery("#loanamount").change(function() {
        q.slider("value", this.value.replace(/[^\d\.]/g, "")), T()
    }), jQuery("#loaninterest").change(function() {
        r.slider("value", this.value), T()
    }), jQuery("#loanterm").change(function() {
        jQuery("#emicalculatorform input[name='loantenure']")[0].checked ? t.slider("value", this.value) : t.slider("value", this.value / 12), T()
    }), jQuery("#emicalculatorform input[name='loantenure']").change(function() {
        jQuery("#loanterm").val(jQuery("#emicalculatorform input[name='loantenure']")[0].checked ? Math.round(jQuery("#loanterm").val().replace(/[^\d\.]/g, "") / 12 * 100) / 100 : Math.round(12 * jQuery("#loanterm").val().replace(/[^\d\.]/g, ""))), W()
    }), jQuery("#emicalculatorform input[name='emischeme']").change(function() {
        T()
    })
}

function O(a, e, s, n, t, l, r, c, o) {
    L(), jQuery("label[for=loanamount]").html("<strong>" + a + "</strong>"), jQuery("#loanamount").val(Globalize.format(n, "n", "en-IN")), jQuery("#loaninterest").val(1e3 * l / 1e3), jQuery("#loanterm").val(jQuery("#emicalculatorform input[name='loantenure']")[0].checked ? o / 12 : o), V(e, s, t, r, c), N(), W(), "car-loan" == p ? jQuery(".toggle-hidden").removeClass("toggle-hidden").addClass("toggle-visible") : jQuery(".toggle-visible").removeClass("toggle-visible").addClass("toggle-hidden"), "home-loan" == p ? (jQuery(".bbhomeloan").removeClass("hide_element").addClass("show_element"), jQuery(".bbpersonalloan").removeClass("show_element").addClass("hide_element"), jQuery(".bbcarloan").removeClass("show_element").addClass("hide_element")) : "personal-loan" == p ? (jQuery(".bbpersonalloan").removeClass("hide_element").addClass("show_element"), jQuery(".bbhomeloan").removeClass("show_element").addClass("hide_element"), jQuery(".bbcarloan").removeClass("show_element").addClass("hide_element")) : "car-loan" == p && (jQuery(".bbcarloan").removeClass("hide_element").addClass("show_element"), jQuery(".bbhomeloan").removeClass("show_element").addClass("hide_element"), jQuery(".bbpersonalloan").removeClass("show_element").addClass("hide_element"))
}

function W() {
    "home-loan" == p ? (jQuery("#loanamountsteps").html('<span class="tick" style="left: 0%;">|<br/><span class="marker">0</span></span><span class="tick hidden-xs" style="left: 12.5%;">|<br/><span class="marker">25L</span></span><span class="tick" style="left: 25%;">|<br/><span class="marker">50L</span></span><span class="tick hidden-xs" style="left: 37.5%;">|<br/><span class="marker">75L</span></span><span class="tick" style="left: 50%;">|<br/><span class="marker">100L</span></span><span class="tick hidden-xs" style="left: 62.5%;">|<br/><span class="marker">125L</span></span><span class="tick" style="left: 75%;">|<br/><span class="marker">150L</span></span><span class="tick hidden-xs" style="left: 87.5%;">|<br/><span class="marker">175L</span></span><span class="tick" style="left: 100%;">|<br/><span class="marker">200L</span></span>'), jQuery("#loanintereststeps").html('<span class="tick" style="left: 0%;">|<br/><span class="marker">5</span></span><span class="tick" style="left: 16.67%;">|<br/><span class="marker">7.5</span></span><span class="tick" style="left: 33.34%;">|<br/><span class="marker">10</span></span><span class="tick" style="left: 50%;">|<br/><span class="marker">12.5</span></span><span class="tick" style="left: 66.67%;">|<br/><span class="marker">15</span></span><span class="tick" style="left: 83.34%;">|<br/><span class="marker">17.5</span></span><span class="tick" style="left: 100%;">|<br/><span class="marker">20</span></span>'), jQuery("#loantermsteps").html(jQuery("#emicalculatorform input[name='loantenure']")[0].checked ? '<span class="tick" style="left: 0%;">|<br/><span class="marker">0</span></span><span class="tick" style="left: 16.67%;">|<br/><span class="marker">5</span></span><span class="tick" style="left: 33.33%;">|<br/><span class="marker">10</span></span><span class="tick" style="left: 50%;">|<br/><span class="marker">15</span></span><span class="tick" style="left: 66.67%;">|<br/><span class="marker">20</span></span><span class="tick" style="left: 83.33%;">|<br/><span class="marker">25</span></span><span class="tick" style="left: 100%;">|<br/><span class="marker">30</span></span>' : '<span class="tick" style="left: 0%;">|<br/><span class="marker">0</span></span><span class="tick" style="left: 16.67%;">|<br/><span class="marker">60</span></span><span class="tick" style="left: 33.33%;">|<br/><span class="marker">120</span></span><span class="tick" style="left: 50%;">|<br/><span class="marker">180</span></span><span class="tick" style="left: 66.67%;">|<br/><span class="marker">240</span></span><span class="tick" style="left: 83.33%;">|<br/><span class="marker">300</span></span><span class="tick" style="left: 100%;">|<br/><span class="marker">360</span></span>')) : "personal-loan" == p ? (jQuery("#loanamountsteps").html('<span class="tick" style="left: 0%;">|<br/><span class="marker">0</span></span><span class="tick" style="left: 16.67%;">|<br/><span class="marker">2.5L</span></span><span class="tick" style="left: 33.34%;">|<br/><span class="marker">5L</span></span><span class="tick" style="left: 50%;">|<br/><span class="marker">7.5L</span></span><span class="tick" style="left: 66.67%;">|<br/><span class="marker">10L</span></span><span class="tick" style="left: 83.34%;">|<br/><span class="marker">12.5L</span></span><span class="tick" style="left: 100%;">|<br/><span class="marker">15L</span></span>'), jQuery("#loanintereststeps").html('<span class="tick" style="left: 0%;">|<br/><span class="marker">5</span></span><span class="tick" style="left: 12.5%;">|<br/><span class="marker">7.5</span></span><span class="tick" style="left: 25%;">|<br/><span class="marker">10</span></span><span class="tick" style="left: 37.5%;">|<br/><span class="marker">12.5</span></span><span class="tick" style="left: 50%;">|<br/><span class="marker">15</span></span><span class="tick" style="left: 62.5%;">|<br/><span class="marker">17.5</span></span><span class="tick" style="left: 75%;">|<br/><span class="marker">20</span></span><span class="tick" style="left: 87.5%;">|<br/><span class="marker">22.5</span></span><span class="tick" style="left: 100%;">|<br/><span class="marker">25</span></span>'), jQuery("#loantermsteps").html(jQuery("#emicalculatorform input[name='loantenure']")[0].checked ? '<span class="tick" style="left: 0%;">|<br/><span class="marker">0</span></span><span class="tick" style="left: 20%;">|<br/><span class="marker">1</span></span><span class="tick" style="left: 40%;">|<br/><span class="marker">2</span></span><span class="tick" style="left: 60%;">|<br/><span class="marker">3</span></span><span class="tick" style="left: 80%;">|<br/><span class="marker">4</span></span><span class="tick" style="left: 100%;">|<br/><span class="marker">5</span>' : '<span class="tick" style="left: 0%;">|<br/><span class="marker">0</span></span><span class="tick" style="left: 20%;">|<br/><span class="marker">12</span></span><span class="tick" style="left: 40%;">|<br/><span class="marker">24</span></span><span class="tick" style="left: 60%;">|<br/><span class="marker">36</span></span><span class="tick" style="left: 80%;">|<br/><span class="marker">48</span></span><span class="tick" style="left: 100%;">|<br/><span class="marker">60</span>')) : "car-loan" == p && (jQuery("#loanamountsteps").html('<span class="tick" style="left: 0%;">|<br/><span class="marker">0</span></span><span class="tick" style="left: 25%;">|<br/><span class="marker">5L</span></span><span class="tick" style="left: 50%;">|<br/><span class="marker">10L</span></span><span class="tick" style="left: 75%;">|<br/><span class="marker">15L</span></span><span class="tick" style="left: 100%;">|<br/><span class="marker">20L</span></span>'), jQuery("#loanintereststeps").html('<span class="tick" style="left: 0%;">|<br/><span class="marker">5</span></span><span class="tick" style="left: 16.67%;">|<br/><span class="marker">7.5</span></span><span class="tick" style="left: 33.34%;">|<br/><span class="marker">10</span></span><span class="tick" style="left: 50%;">|<br/><span class="marker">12.5</span></span><span class="tick" style="left: 66.67%;">|<br/><span class="marker">15</span></span><span class="tick" style="left: 83.34%;">|<br/><span class="marker">17.5</span></span><span class="tick" style="left: 100%;">|<br/><span class="marker">20</span></span>'), jQuery("#loantermsteps").html(jQuery("#emicalculatorform input[name='loantenure']")[0].checked ? '<span class="tick" style="left: 0%;">|<br/><span class="marker">0</span></span><span class="tick" style="left: 14.29%;">|<br/><span class="marker">1</span></span><span class="tick" style="left: 28.57%;">|<br/><span class="marker">2</span></span><span class="tick" style="left: 42.86%;">|<br/><span class="marker">3</span></span><span class="tick" style="left: 57.14%;">|<br/><span class="marker">4</span></span><span class="tick" style="left: 71.43%;">|<br/><span class="marker">5</span></span><span class="tick" style="left: 85.71%;">|<br/><span class="marker">6</span></span><span class="tick" style="left: 100%;">|<br/><span class="marker">7</span></span>' : '<span class="tick" style="left: 0%;">|<br/><span class="marker">0</span></span><span class="tick" style="left: 14.29%;">|<br/><span class="marker">12</span></span><span class="tick" style="left: 28.57%;">|<br/><span class="marker">24</span></span><span class="tick" style="left: 42.86%;">|<br/><span class="marker">36</span></span><span class="tick" style="left: 57.14%;">|<br/><span class="marker">48</span></span><span class="tick" style="left: 71.43%;">|<br/><span class="marker">60</span></span><span class="tick" style="left: 85.71%;">|<br/><span class="marker">72</span></span><span class="tick" style="left: 100%;">|<br/><span class="marker">84</span></span>'))
}

function R() {
    jQuery(".ecalprint").click(function() {
        return window.print(), !1
    })
}

function S() {
    jQuery(".ecalshare").click(function() {
        jQuery("#loader").toggle();
        var a = M(),
            a = U(JSON.stringify(a));
        return jQuery.get("http://emicalculator.net/bitly/?longURL=http://emicalculator.net/?ecdata=" + a, function(a) {
            jQuery("#sharelink").val(a), jQuery("#ecalsharelink").slideDown(), jQuery("#loader").toggle()
        }), !1
    }), jQuery("#sharelink").click(function() {
        jQuery(this).focus().select()
    })
}

function T() {
    jQuery("#emicalculatorform").mask("Calculating EMI..."), setTimeout(Y, 10)
}

function Y() {
    jQuery("#ecalsharelink").hide(), c = Math.abs(jQuery("#loanamount").val().replace(/[^\d\.]/g, "")), e = Math.abs(jQuery("#loaninterest").val() / 12 / 100), g = Math.abs(jQuery("#emicalculatorform input[name='loantenure']")[0].checked ? Math.round(12 * jQuery("#loanterm").val()) : jQuery("#loanterm").val()), 0 == e && (jQuery("#loaninterest").val(5), e = .004166666666666667, r.slider("value", 5)), 0 == g && (jQuery("#loanterm").val(jQuery("#emicalculatorform input[name='loantenure']")[0].checked ? 1 : 12), t.slider("value", 1), g = 12), k = 0, "emiadvance" == jQuery("#emicalculatorform input[name='emischeme']:checked").val() && (k = 1), jQuery("#loanstartdate").val(jQuery("#startmonthyear").val()), h = "car-loan" == p && 1 == k ? Math.pow(1 + e, g - 1) / (Math.pow(1 + e, g) - 1) * e * c : Math.pow(1 + e, g) / (Math.pow(1 + e, g) - 1) * e * c, jQuery("#emiamount span").text(Globalize.format(Math.round(h), "n", "en-IN")), jQuery("#emitotalinterest span").text(Globalize.format(Math.round(h * g - c), "n", "en-IN")), jQuery("#emitotalamount span").text(Globalize.format(Math.round(h * g), "n", "en-IN")), w = [], x = [], y = [], z = [], A = [], B = [], D = [], E = [], F = [], G = [], B[0] = new Date(m.c.getTime()), "car-loan" == p && 1 == k ? (E[0] = 0, D[0] = h) : (E[0] = c * e, D[0] = h - E[0]), F[0] = c - D[0], G[0] = (c - F[0]) / c * 100;
    var a = B[0].getFullYear(),
        s = 0;
    for (w[s++] = a, x[a] = D[0], y[a] = E[0], z[a] = F[0], A[a] = G[0], i = 1; i < g; i++) B[i] = new Date(B[i - 1].getTime()), B[i].setMonth(B[i].getMonth() + 1, 1), E[i] = F[i - 1] * e, D[i] = h - E[i], F[i] = F[i - 1] - D[i], G[i] = (c - F[i]) / c * 100, B[i].getFullYear() != a && (a = B[i].getFullYear(), w[s++] = a, x[a] = 0, y[a] = 0, z[a] = 0, A[a] = 0), x[a] += D[i], y[a] += E[i], z[a] = F[i], A[a] = G[i];
    F[g - 1] = 0, z[a] = 0, G[g - 1] = 100, A[a] = 100, Z(), aa(), ba(), jQuery("#emicalculatorform").unmask()
}

function aa() {
    for (var a = [], e = [], s = [], n = [], t = 0, t = 0, l = w.length; l > t; t++) {
        var r = w[t];
        a[t] = r, e[t] = x[r], s[t] = y[r], n[t] = z[r]
    }
    new Highcharts.Chart({
        chart: {
            renderTo: "emibarchart",
            backgroundColor: "transparent",
            plotBackgroundColor: "transparent",
            defaultSeriesType: "column",
            borderWidth: 0,
            C: 0,
            G: 0
        },
        title: {
            text: ""
        },
        xAxis: {
            categories: a,
            minorTickInterval: "auto",
            tickmarkPlacement: "on",
            labels: {
                rotation: -45,
                align: "right",
                step: 8 < w.length ? 2 : 1,
                style: {
                    font: "normal 9px Verdana, sans-serif"
                },
                formatter: function() {
                    return this.value
                }
            }
        },
        yAxis: [{
            min: 0,
            title: {
                text: "EMI Payment / year"
            },
            stackLabels: {
                enabled: !1,
                style: {
                    fontWeight: "bold",
                    color: Highcharts.theme && Highcharts.theme.j || "gray"
                }
            },
            opposite: !0,
            labels: {
                formatter: function() {
                    return "₹ " + Globalize.format(this.value, "n", "en-IN")
                }
            }
        }, {
            min: 0,
            title: {
                text: "Balance"
            },
            stackLabels: {
                enabled: !1,
                style: {
                    fontWeight: "bold",
                    color: Highcharts.theme && Highcharts.theme.j || "gray"
                }
            },
            labels: {
                formatter: function() {
                    return "₹ " + Globalize.format(this.value, "n", "en-IN")
                }
            }
        }],
        legend: {
            align: "center",
            itemMarginBottom: 2,
            itemMarginTop: 2,
            verticalAlign: "bottom",
            floating: !1,
            backgroundColor: "#fff",
            shadow: !1
        },
        tooltip: {
            formatter: function() {
                return "Balance" == this.series.name ? "<b>Year: " + this.x + "</b><br/>" + this.series.name + " : ₹ " + Globalize.format(this.y, "n", "en-IN") + "<br/>Loan Paid To Date : " + Globalize.format((c - this.y) / c * 100, "n2", "en-IN") + "%" : "<b>Year : " + this.x + "</b><br/>" + this.series.name + " : ₹ " + Globalize.format(this.y, "n", "en-IN") + "<br/>Total Payment : ₹ " + Globalize.format(this.point.stackTotal, "n", "en-IN")
            }
        },
        plotOptions: {
            column: {
                borderWidth: 0,
                stacking: "normal",
                dataLabels: {
                    enabled: !1,
                    color: Highcharts.theme && Highcharts.theme.u || "white"
                }
            }
        },
        series: [{
            name: "Interest",
            data: s,
            yAxis: 0,
            legendIndex: 2,
            color: "#F39314"
        }, {
            name: "Principal",
            data: e,
            yAxis: 0,
            legendIndex: 1,
            color: "#613842"
        }, {
            name: "Balance",
            data: n,
            type: "spline",
            yAxis: 1,
            legendIndex: 3,
            color: "#6d480f"
        }]
    })
}

function ba() {
    n = '<table><tr><th class="col-xs-2 col-md-1" id="yearheader">Year</th><th class="col-sm-2 hidden-xs" id="principalheader">Principal<br/>(A)</th><th class="col-xs-3 col-sm-2 visible-xs" id="principalheader">Principal</th><th class="col-sm-2 hidden-xs" id="interestheader">Interest<br/>(B)</th><th class="col-xs-3 col-sm-2 visible-xs" id="interestheader">Interest</th><th class="col-sm-3 hidden-xs" id="totalheader">Total Payment<br/>(A + B)</th><th class="col-xs-4 col-sm-3" id="balanceheader">Balance</th><th class="col-md-1 hidden-xs hidden-sm" id="paidtodateheader">Loan Paid To Date</th></tr>';
    for (var a = 0, e = 0, s = w.length; s > e; e++) {
        var t = w[e];
        n += '<tr class="yearlypaymentdetails"><td id="year' + t + '" class="col-xs-2 col-md-1 paymentyear toggle">' + t + '</td><td class="col-xs-3 col-sm-2 currency">₹ ' + Globalize.format(x[t], "n", "en-IN") + '</td><td class="col-xs-3 col-sm-2 currency">₹ ' + Globalize.format(y[t], "n", "en-IN") + '</td><td class="col-sm-3 hidden-xs currency">₹ ' + Globalize.format(x[t] + y[t], "n", "en-IN") + '</td><td class="col-xs-4 col-sm-3 currency">₹ ' + Globalize.format(z[t], "n", "en-IN") + '</td><td class="col-md-1 hidden-xs hidden-sm paidtodateyear">' + Globalize.format(A[t], "n2", "en-IN") + "%</td></tr>", n += '<tr id="monthyear' + t + '" class="monthlypaymentdetails"><td class="monthyearwrapper" colspan="6"><div class="monthlypaymentcontainer"><table>';
        for (var l = B.length; l > a && B[a].getFullYear() == t;) n += '<tr><td class="col-xs-2 col-md-1 paymentmonthyear">' + I[B[a].getMonth()] + '</td><td class="col-xs-3 col-sm-2 currency">₹ ' + Globalize.format(D[a], "n", "en-IN") + '</td><td class="col-xs-3 col-sm-2 currency">₹ ' + Globalize.format(E[a], "n", "en-IN") + '</td><td class="col-sm-3 hidden-xs currency">₹ ' + Globalize.format(D[a] + E[a], "n", "en-IN") + '</td><td class="col-xs-4 col-sm-3 currency">₹ ' + Globalize.format(F[a], "n", "en-IN") + '</td><td class="col-md-1 hidden-xs hidden-sm paidtodatemonthyear">' + Globalize.format(G[a++], "n2", "en-IN") + "%</td></tr>";
        n += "</table></div></td></tr>"
    }
    n += "</table>", jQuery("#emipaymenttable").html(n), jQuery("#emipaymenttable tr.monthlypaymentdetails").find("div").hide(), jQuery("#emipaymenttable td.toggle").click(function() {
        var a = jQuery(this).attr("id");
        jQuery(this).toggleClass("toggle-open"), jQuery("tr#month" + a).find("div").slideToggle()
    })
}

function Z() {
    new Highcharts.Chart({
        chart: {
            renderTo: "emipiechart",
            backgroundColor: "transparent",
            plotBackgroundColor: "transparent",
            borderWidth: null,
            plotBorderWidth: null,
            plotShadow: !1
        },
        title: {
            text: "Break-up of Total Payment"
        },
        tooltip: {
            formatter: function() {
                return "<b>" + this.point.name + ": " + Math.round(10 * this.percentage) / 10 + "%</b>"
            }
        },
        plotOptions: {
            pie: {
                borderWidth: 0,
                startAngle: 0,
                allowPointSelect: !0,
                cursor: "pointer",
                dataLabels: {
                    enabled: !0,
                    distance: -30,
                    color: "#FFFFFF",
                    formatter: function() {
                        return "<b>" + Math.round(10 * this.percentage) / 10 + "%</b>"
                    }
                },
                showInLegend: !0
            }
        },
        series: [{
            type: "pie",
            name: "Principal Loan Amount vs. Total Interest",
            data: [{
                name: "Principal Loan Amount",
                y: c,
                color: "#613842"
            }, {
                name: "Total Interest",
                y: h * g - c,
                sliced: !0,
                selected: !0,
                color: "#F39314"
            }]
        }]
    })
}
var c, e, g, h, k, m = {
        c: new Date
    },
    n, p, q, r, t, u, v, w = [],
    x = [],
    y = [],
    z = [],
    A = [],
    B = [],
    D = [],
    E = [],
    F = [],
    G = [],
    I = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
jQuery(document).ready(function() {
    J("home-loan"), K();
    var a = jQuery("#loandata").val();
    if ("" != a) {
        jQuery(".loanproduct-nav").hide(), a = jQuery.parseJSON(decodeURIComponent(escape(Base64.decode(a)))), p = a.loanproduct, J(p), L(), M(a), N();
        var e = Math.abs(jQuery("#loanamount").val().replace(/[^\d\.]/g, "")),
            s = jQuery("#loaninterest").val(),
            n = jQuery("#loanterm").val();
        "loanyears" == a.loantenure && (n *= 12), jQuery("#emicalculatorform input[name='emischeme']:checked").val(), "home-loan" == p ? O("Home Loan Amount", 2e7, 1e5, e, 20, s, 30, .5, n) : "personal-loan" == p ? O("Personal Loan Amount", 15e5, 1e4, e, 25, s, 5, .25, n) : "car-loan" == p && O("Car Loan Amount", 2e6, 1e4, e, 20, s, 7, .25, n), 0 < (selDate = a.loanstartdate).length && (v = selDate.substring(selDate.length - 4, selDate.length), u = jQuery.inArray(selDate.substring(0, selDate.length - 5), I), jQuery("#startmonthyear").datepicker("setDate", new Date(v, u, 1)))
    } else O("Home Loan Amount", 2e7, 1e5, 5e6, 20, 10.5, 30, .5, 240);
    P(), R(), S(), T()
});