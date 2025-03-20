from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
token = credential.get_token("https://ossrdbms-aad.database.windows.net/.default")

print(token.token)