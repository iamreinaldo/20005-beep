import httpx


def check_service(url: str) -> str:
    try:
        response = httpx.get(url, timeout=5)

        if response.status_code < 500:
            return "online"

        return "offline"

    except Exception:
        return "offline"