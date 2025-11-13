exports.handler = async (event, context) => {
  const { queryStringParameters } = event;
  const params = new URLSearchParams(queryStringParameters || {});
  
  // For PKCE flow, just redirect to GitHub OAuth with the parameters
  // Netlify CMS will handle the PKCE flow client-side
  const clientId = 'Ov23liO3UDaEIBmLhm4p';
  const redirectUri = 'https://scottshapiro.com/admin/';
  
  // Build GitHub OAuth URL
  const githubParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: params.get('scope') || 'repo',
    state: params.get('state') || Math.random().toString(36).substring(7)
  });
  
  // If there's a code_verifier (PKCE), add it
  if (params.get('code_verifier')) {
    githubParams.append('code_verifier', params.get('code_verifier'));
  }
  
  const githubAuthUrl = `https://github.com/login/oauth/authorize?${githubParams.toString()}`;
  
  return {
    statusCode: 302,
    headers: {
      Location: githubAuthUrl
    }
  };
};

