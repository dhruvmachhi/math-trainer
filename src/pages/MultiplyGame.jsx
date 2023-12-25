import MathGame from "../components/MathGame";

function MultiplyGame() {
    function newQuestion() {
        return {
            numbers: [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1],
            symbol: "x"
        }
    }

    function condition(answer, num1, num2) {
        return answer == num1 * num2;
    }

    return <MathGame questionGenerator={newQuestion} condition={condition} pageTitle={"Multiply Game"}/>
}

export default MultiplyGame