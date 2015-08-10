var apiVersion = 'v30.0',
clientId = '3MVG9xOCXq4ID1uFuzsT8e83ywtpLIE24Py92dqkMNFsbV_F16u0iAKNRsiLcqlMxgyZl6fO.oT30x64dC8BJ',
loginUrl = 'https://login.salesforce.com/',
redirectURI = 'http://localhost:3000/oauthcallback.html',
proxyURL = 'http://localhost:3000/proxy/',
client = new forcetk.Client(clientId, loginUrl, proxyURL);
// login function using encodeURI methods
    function login() {
        var url = loginUrl + 'services/oauth2/authorize?display=popup&response_type=token'
                    + '&client_id=' + encodeURIComponent(clientId)
                    + '&redirect_uri=' + encodeURIComponent(redirectURI);
        window.open(url);
    }
//oauthCallback() is called by the oauthcallback.html page at the end of the OAuth workflow
          function oauthCallback(response) {
              if (response && response.access_token) {
                  client.setSessionToken(response.access_token,
                                         apiVersion,
                                         response.instance_url);
                  console.log('OAuth authentication succeeded');
                  getSessions();
              } else {
                  alert("AuthenticationError: No Token");
              }
          }
          function getSessions() {
              var soql = "SELECT Id, Name, Session_Date__c FROM Session__c",
                  html = '';
              client.query(soql,
                  function (data) {
                      var sessions = data.records;
                      for (var i=0; i<sessions.length; i++) {
                          html += '<li class="table-view-cell">' + sessions[i].Name + '</li>';
                      }
                      $('.session-list').html(html);
                  },
                  function (error) {
                      alert("Error: " + JSON.stringify(error));
                  });
              return false;
          }

          login();
