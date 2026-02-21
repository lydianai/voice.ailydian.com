from ailydian_client import AILYDIANBackend

backend = AILYDIANBackend(project_id="voice.ailydian.com")
print("Backend connected:", backend.project_id)
