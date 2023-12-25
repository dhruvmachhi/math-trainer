import MathGame from "../components/MathGame";

function AddGame() {
    function newQuestion() {
        return {
            numbers: [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1],
            symbol: "+"
        }
    }

    function condition(answer, num1, num2) {
        return answer == num1 + num2;
    }

    return <MathGame questionGenerator={newQuestion} condition={condition} pageTitle={"Addition Game"}/>
}

export default AddGame