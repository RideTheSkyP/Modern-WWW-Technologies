<!doctype html>

<html lang="en">
<head>
	<title>Home</title>
	<link rel="stylesheet" href="/css/index.css?v=1">
	<script src="js/index.js"></script>
	<link href="https://fonts.googleapis.com/css?family=EB+Garamond:400,500&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body id="home">

	<?php include "php/sidenav.php";?>

	<div class="backdrop-container" id="backdrop"></div>

	<?php include "php/sidebar.php";?>

	<div class="navbar">
		<ul>
			<li><a href="#about">About Me</a></li>
			<li><a href="#hobby">Hobby</a></li>
			<li><a href="#mlai">Machine Learning</a></li>
		</ul>
	</div>

	<main>
		<div id="about">
			<h2>About Me</h2>
			<p style="width: 700px;"><img src="images/me.jpg" alt="image" width="175px" height="300px" style="float: right;">
			Hello, my name is Volodymyr Mamedov. I'm a student at Wroclaw University of Science and Technology, Computer Science department. Really like programming, it's my hobby. Usually I'm coding in Python. Since started learning this language, I was interested in Machine Learning/AI and Data Science.</p>
		</div>

		<div id="hobby">
			<h3>Hobbies</h3>
			<p>I have many interests, but my two favorite things are skiing and programming.</p>
			<p>I like skiing cause it's giving me unique sensations. Like that feeling when you are slicing the snow while watching the mountains and rich nature. That makes me feel so curious. Also I like swimming and cycling.</p>
		</div>

		<div id="mlai">
			<h3>Machine Learning</h3>
			<p>I had written a pneumonia detector app, which predicting if person had pneumonia or not, by their chest x-ray images. This project gave me experience in machine learning models, models design and it was my first big team project.</p>
			<p>Machine learning (ML) - is the study of computer algorithms that improve automatically through experience. It is seen as a part of artificial intelligence. Machine learning algorithms build a model based on sample data, known as "training data", in order to make predictions or decisions without being explicitly programmed to do so. Machine learning algorithms are used in a wide variety of applications, such as email filtering and computer vision, where it is difficult or unfeasible to develop conventional algorithms to perform the needed tasks.</p>
			<h3>Data Science</h3>
			<p>Data science is an inter-disciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from many structural and unstructured data. Data science is related to data mining, machine learning and big data.</p>
			<p>Data science is a "concept to unify statistics, data analysis and their related methods" in order to "understand and analyze actual phenomena" with data. It uses techniques and theories drawn from many fields within the context of mathematics, statistics, computer science, domain knowledge and information science. Turing award winner Jim Gray imagined data science as a "fourth paradigm" of science (empirical, theoretical, computational and now data-driven) and asserted that "everything about science is changing because of the impact of information technology" and the data deluge.</p>
		</div>
	</main>

	<?php include "php/footer.php";?>
</body>
</html>