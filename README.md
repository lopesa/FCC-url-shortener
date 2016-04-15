## URL Shortener Microservice
### Free Code Camp - API Project
<br>
#### User Stories

  * I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.</p>

  * If I pass an invalid URL that doesn't follow the valid http(s)://www.example.com format, the JSON response will contain an error instead.</p>

  * When I visit that shortened URL, it will redirect me to my original link.</p>

#### Example usage: Create new short url:
`http://url-shortify.herokuapp.com/new/<your url to be shortified>`

**&lt;your url to be shortified&gt;** can be http or https and .com, org, net, or co. Optional, specify any port up to 5 digits. Returns shortened url

#### Example usage: Use it:
`http://url-shortify.herokuapp.com/<your shortened url>`