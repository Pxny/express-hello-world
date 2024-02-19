function toggleActivation(element) {
		document.getElementById("valueDisplay").innerHTML = element.id;
		element.classList.toggle("activated");
	}

	function makeList() {
		let images = [''];
		const imgCollection = document.getElementsByClassName("image");
		for (let i = 0; i < imgCollection.length; i++) {
			if(imgCollection[i].classList.contains("activated")){
				images.push(imgCollection[i].id);
			}
		}

		let list = '';
		for (let j = 0; j < images.length; j++) {
			list += images[j] + ' ';
		}
		document.getElementById('list').innerHTML = list;

		try {
			const userid = localStorage.getItem('userid');
			fetch("https://94a1b373-a074-4db5-a3cf-4325b9cddd12-00-3tmzfufo54kut.spock.repl.co/webservice/users", {
				method: "POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': '*/*',
					'Accept-Encoding': 'gzip, deflate, br',
					'Connection': 'keep-alive'
				},
				body: new URLSearchParams({
					'user_id': `${userid}`,
					'type': 'SET_OPLIST',
					'list': `${list}`
				})
				.toString()
			})
			.then(res => {
				var x = document.getElementById("snackbar");
				x.className = "show";
				x.innerHTML = (res.result == 'successful')? 'Success!': 'Error: Try again later';
				x.style.backgroundColor = (res.result == 'successful')? '#04AA6D': '#e00000';
				setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
				
			});
		} 
		catch(err) {
			console.log('Did not work');
		}
	}
