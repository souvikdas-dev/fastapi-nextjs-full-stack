import re
from typing import Annotated

from pydantic_core import PydanticCustomError
import requests
from pydantic import AfterValidator


def validate_name(value: str) -> str:
    """validates name (A-Z, a-z, and spaces) & remove leading, trailing, and multiple consecutive spaces between words

    Args:
        value (str):

    Returns:
        str
    """

    # Trim leading/trailing spaces
    value = value.strip()

    # Replace multiple spaces with a single space between words
    value = re.sub(r"\s+", " ", value)

    # Regular expression to match a name containing only A-Z, a-z, and spaces between characters
    pattern = r"^[A-Za-z]+(?: [A-Za-z]+)*$"

    # Match the name against the pattern
    if re.match(pattern, value):
        return value
    else:
        raise PydanticCustomError(
            "invalid_name",
            "name should only consists of A-Z, a-z, and spaces",
            {"attribute": "name"},
        )


NameStr = Annotated[str, AfterValidator(validate_name)]


# Predefined list of common passwords (you can load this from a file or external source)
COMMON_PASSWORDS_URL = (
    "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt"
)
COMMON_PASSWORDS = set(
    [
        "password",
        "123456",
        "qwerty",
        "letmein",
        "123123",
        "welcome",
        "admin",
        "password123",
        "123456789",
    ]
)


def load_common_passwords():
    """Load common passwords from an external URL or file."""
    try:
        response = requests.get(COMMON_PASSWORDS_URL)
        if response.status_code == 200:
            words = response.text.splitlines()
            return set(words)  # Load into a set for faster lookup
        else:
            print("Failed to fetch common passwords from URL. Using default list.")
            return COMMON_PASSWORDS
    except Exception as e:
        print(f"Error fetching common passwords: {e}. Using default list.")
        return COMMON_PASSWORDS


def is_strong_password(
    password: str, min_length: int = 8, check_common: bool = True
) -> str:
    """Validate if the password meets modern security requirements."""

    # Ensure the password has the minimum length
    if len(password) < min_length:
        raise ValueError(f"Password must be at least {min_length} characters long.")

    # Check for uppercase letter
    if not re.search(r"[A-Z]", password):
        raise ValueError("Password must contain at least one uppercase letter.")

    # Check for lowercase letter
    if not re.search(r"[a-z]", password):
        raise ValueError("Password must contain at least one lowercase letter.")

    # Check for digit
    if not re.search(r"[0-9]", password):
        raise ValueError("Password must contain at least one digit.")

    # Check for special character
    if not re.search(r"[\W_]", password):
        raise ValueError(
            "Password must contain at least one special character (e.g., !@#$%^&*)."
        )

    # Check for whitespace
    if re.search(r"\s", password):
        raise ValueError("Password must not contain spaces or tabs.")

    # Check if the password is too common
    if check_common:
        common_passwords = load_common_passwords()  # Load the common password list
        if password.lower() in common_passwords:
            raise ValueError("Password is too common and insecure.")

    return password


PasswordStr = Annotated[str, AfterValidator(is_strong_password)]

if __name__ == "__main__":
    # Example usage:
    def validate_password(password: str) -> str:
        try:
            is_strong_password(password)
            return "Password is valid!"
        except ValueError as e:
            return str(e)

    # Test cases
    print(validate_password("Password123!"))  # Valid
    print(validate_password("password123"))  # Invalid (no uppercase, no special char)
    print(validate_password("Password!"))  # Invalid (too short, no digit)
    print(validate_password("Password123"))  # Invalid (no special character)
    print(validate_password("  Password123!"))  # Invalid (contains space)
    print(validate_password("12345"))  # Invalid (too short, no special char)
    print(validate_password("123456789"))  # Invalid (common password)
