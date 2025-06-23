var txtName = "";
var txtEmail = "";
var txtGate = "";
var txtDate = "";

const notyf = new Notyf({
  duration: 1000,
  position: {
    x: "right",
    y: "bottom",
  },
  types: [
    {
      type: "warning",
      background: "orange",
      icon: {
        className: "material-icons",
        tagName: "i",
        text: "warning",
      },
    },
    {
      type: "error",
      background: "indianred",
      duration: 2000,
      dismissible: true,
    },
  ],
});

$(".txtDate").daterangepicker(
  {
    singleDatePicker: true,
    autoApply: true,
    locale: {
      format: "DD MMM YYYY",
    },
  },
  function (start, end, label) {
    console.log(
      "New date range selected: " +
        start.format("YYYY-MM-DD") +
        " to " +
        end.format("YYYY-MM-DD") +
        " (predefined range: " +
        label +
        ")"
    );
  }
);

$(".btn-submit").click(function () {
  txtName = $(".txtName").val();
  txtDate = $(".txtDate").val();
  txtGate = $("#txtGate").val();

  if (txtName == "" || !moment(txtDate, "DD MMM YYYY").isValid()) {
    notyf.error({
      message: "Fill all data",
      duration: 9000,
      icon: false,
    });
  } else {
    // $(".name").html("<p>Nama: " + txtName + "</p>");
    // $(".email").html("<p>Email: " + txtEmail + "</p>");

    swal({
      title: "Attention!",
      text: `Hello ${txtName} !, your flight will be at ${txtDate} and please use gate ${txtGate}`,
      icon: "success",
      button: "Ok",
    });

    $(".txtName").val("");
    $(".txtEmail").val("");
    $(".txtPass").val("");
  }
});
