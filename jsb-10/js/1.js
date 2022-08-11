const starColors = {
    "rating": "red",
    "empty": "black",
    "selected": "salmon",
    "unselected": "darkred",
}

const ERRORS = {
    "text": {
        tooShort: "Сообщение слишком короткое",
        valueMissing: "А сообщение??!??",
    },
};

// const messages = {
//     1: "А что так мало?",
//     2: "Тебе жалко что-ли?",
//     3: "Хм... А сам бы так смог?",
//     4: "Чуть-чуть не дотянул до нормально.",
//     5: "Нормально, но можно лучше.",
//     6: "Есть к чему стремиться.",
//     7: "Почти хорошо.",
//     8: "Хороший результат!",
//     9: "Молодец! Так держать!",
//     10: "Идеально!"
// }

const errorKeys = Object.keys(ValidityState.prototype);

function getElementIndex(element) {
    let index = 0;
    while (element = element.previousElementSibling) {
        index++;
    }
    return index;
}

function paintSiblings(container, position) {
    const total = container.childElementCount;
    const rating = Number(container.dataset.rating);
    const colors = Array(total).fill(starColors.empty, rating);

    for (let index = 0; index < rating; index++) {
        colors[index] = starColors.rating
    }

    if (position > 0) {
        for (let index = Math.min(rating, position); index < Math.max(rating, position); index++) {
            if (colors[index] === starColors.rating) {
                    colors[index] = starColors.unselected;
                } else {
                    colors[index] = starColors.selected;
                }
        }
    }

    for (let index = 0; index < total; index++) {
        container.children[index].style = `color: ${colors[index]};`;
    }
}

function handleMouseStarEnter(event) {
    const target = event.target;
    const position = getElementIndex(target);
    paintSiblings(target.parentNode, position + 1);
}

function handleMouseStarsLeave(event) {
    const target = event.target;
    paintSiblings(target, 0);
}

function handleMouseStarsClick(event) {
    const target = event.target;
    const parent = target.parentNode;
    const position = getElementIndex(target);
    parent.dataset.rating = position + 1;
}

function checkValidity(targetForm, targetMessage) {
    const controls = targetForm.querySelectorAll(".form__input");

    for (const control of controls) {
        if (control.validity.valid) continue;

        for (const error of errorKeys) {
            if (!control.validity[error]) continue;

            targetMessage.textContent = ERRORS[control.name][error];
            targetMessage.classList.remove("form__message_hidden");
            return false;
        }
    }

    return true;
}

document.addEventListener("DOMContentLoaded", function(event) {
    
    const form = document.querySelector(".form");
    const rating = form.querySelector(".form__rating");
    const message = form.querySelector(".form__message");

    rating.childNodes.forEach((element) => element.addEventListener("mouseenter", handleMouseStarEnter));
    rating.addEventListener("mouseleave", handleMouseStarsLeave);
    rating.addEventListener("mouseup", handleMouseStarsClick);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const target = event.target;
        const ratingNode = form.querySelector(".form__rating");
        
        if (!checkValidity(target, message)) return;

        const rating = Number(ratingNode.dataset.rating);

        if (rating === 0) {
            message.textContent = "Без рейтинга не отправлю!";
            message.classList.remove("form__message_hidden");
            return;
        }

        message.classList.add("form__message_hidden");

        comment = target.querySelector(".form__input_textarea");

        answer = {
            "rating": rating,
            "comment": comment.value,
        }

        console.log(answer);
        // TODO: send form data
    });

});