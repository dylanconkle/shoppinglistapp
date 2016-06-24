$(function() {
    var dialog, form,

        // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
        nameRegex = /^[a-z]([0-9a-z_\s])+$/i,
        priceRegex = /^\d+(?:[.]\d{1,2}|$)$/,
        quantityRegex = /^([0-9a-zA-Z])+$/,
        name = $("#name"),
        price = $("#price"),
        quantity = $("#quantity"),
        allFields = $([]).add(name).add(price).add(quantity),
        tips = $(".validateTips");

    function updateTips(t) {
        tips
            .text(t)
            .addClass("ui-state-highlight");
        setTimeout(function() {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("Length of " + n + " must be between " +
                min + " and " + max + ".");
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp(o, regexp, n) {
        if (!(regexp.test(o.val()))) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }

    function addUser() {
        var valid = true;
        allFields.removeClass("ui-state-error");

        valid = valid && checkLength(name, "username", 1, 16);
        valid = valid && checkLength(price, "price", 1, 80);
        valid = valid && checkLength(quantity, "quantity", 1, 16);

        valid = valid && checkRegexp(name, nameRegex, "Item Name may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
        valid = valid && checkRegexp(price, priceRegex, "eg. 1.23");
        valid = valid && checkRegexp(quantity, quantityRegex, "Please enter a Valid Number");

        if (valid) {
            $("#users tbody").append("<tr>" +
                "<td>" + name.val() + "</td>" +
                "<td>" + price.val() + "</td>" +
                "<td>" + quantity.val() + "<button class=\"removebtn\">Delete</button>" + "</td>" +
                "</tr>");
            dialog.dialog("close");
        }
        return valid;
    }

    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            "Add Item to Shopping list": addUser,
            Cancel: function() {
                dialog.dialog("close");
            }
        },
        close: function() {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    form = dialog.find("form").on("submit", function(event) {
        event.preventDefault();
        addUser();
    });

    $("#create-user").button().on("click", function() {
        dialog.dialog("open");
    });
});
$(document).ready(function() {
            $('#shoppinglist').on('click', '.removebtn', function() {
                $(this).closest('tr').remove();
            });
  });
