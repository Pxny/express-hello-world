function generateRandomString() {
		let randomString = '';
		const randomNumber = Math.floor(Math.random() * 10);

		for (let i = 0; i < 20 + randomNumber; i++) {
			randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
		}

		return randomString;
	}

	window.onload = () => {
		const fragment = new URLSearchParams(window.location.hash.slice(1));
		const [accessToken, tokenType, state] = [fragment.get('access_token'), fragment.get('token_type'), fragment.get('state')];

		if (!accessToken && !localStorage.getItem('userid')) {
			const randomString = generateRandomString();
			localStorage.setItem('oauth-state', randomString);
			window.location.assign(`${document.getElementById('login').href}&state=${btoa(randomString)}`);

			//return (document.getElementById('login').style.display = 'block');
		}
		
		if (localStorage.getItem('oauth-state') !== atob(decodeURIComponent(state))) {
			return console.log('You may have been clickjacked!');

		}else {
			console.log('Huzzah! Successful authentication journey!');
			document.getElementById('login').style.display = 'block';
		}

		if (!localStorage.getItem('userid')){
			fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${tokenType} ${accessToken}`,
				},
			})
			.then(result => result.json())
			.then(response => {
				const { username, discriminator, id } = response;
				localStorage.setItem('userid', id);
				document.getElementById('info').innerText += ` ${username}#${discriminator}`;
			})
			.catch(console.error);
		}
	};
