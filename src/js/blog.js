var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
let containsError = true;
let comment_form = document.getElementById("comment-form");
let comment_email = document.getElementById("comment-input-email");
let comment_comment = document.getElementById("comment-input-comment");

function validateInput(x) {
  if (x.value == "") {
    x.classList.add("error");
    containsError = true;
  }
  if (x.value != "") {
    x.classList.remove("error");
    containsError = false;
  }
}
function validateEmail(x) {
  if (!x.value.match(mailformat)) {
    x.classList.add("error");
    containsError = true;
  } else {
    x.classList.remove("error");
    containsError = false;
  }
}

comment_form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (containsError == false) {
    all_comments = JSON.parse(localStorage.getItem("arr-comments"));
    let newObject = [
      {
        email: comment_email.value,
        comment: comment_comment.value,
      },
    ];

    var dataArray = [];
    if (all_comments) {
      dataArray = all_comments;
    }
    dataArray.push(newObject);
    localStorage.setItem("arr-comments", JSON.stringify(dataArray));
    alert("Comment Sent");
    comment_form.reset();
  } else {
    console.log(comment_comment);
    comment_email.classList.add("error");
    comment_comment.classList.add("error");
  }
});
