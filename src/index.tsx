import * as React from "react";
import { render } from "react-dom";
import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";
import "./styles.scss";


const clamp = (value: number, clampAt: number = 30) => {
	if (value > 0) {
		return value > clampAt ? clampAt : value;
	} else {
		return value < -clampAt ? -clampAt : value;
	}
};


const slides = [
	require("./img/hi.jpg"),
	require("./img/view.jpg"),
	require("./img/kitchen.jpg"),
	require("./img/kitchen2.jpg"),
	require("./img/livingroom.jpg"),
	require("./img/house.jpg"),
];

const App = () => {
	const [style, set] = useSpring(() => ({
		transform: "perspective(500px) rotateY(0deg)"
	}));

	const bind = useScroll(event => {
		set({
		transform: `perspective(500px) rotateY(${
			event.scrolling ? clamp(event.delta[0]) : 0
		}deg)`
		});
	});

	return (
		<>
		<div className="container" {...bind()}>
			{slides.map(src => (
			<animated.div
				key={src}
				className="card"
				style={{
				...style,
				backgroundImage: `url(${src})`
				}}
			/>
			))}
		</div>
		</>
	);
};

const rootElement = document.getElementById("root");
render(<App />, rootElement);
