import re
from typing import Final

from pydantic import ValidationError
from pydantic_core import ErrorDetails

# Compile regex patterns once for better performance
SPECIAL_CHARS_PATTERN: Final = re.compile(r"[-_]")
CAMEL_CASE_PATTERN: Final = re.compile(r"([a-z0-9])([A-Z])")
ACRONYM_PATTERN: Final = re.compile(r"([A-Z])([A-Z][a-z])")


def normalize_case_string(text: str) -> str:
    """
    Converts various case formats to a lowercase string with spaces.

    This function handles the following case formats:
    - camelCase
    - PascalCase
    - snake_case
    - kebab-case
    - SCREAMING_SNAKE_CASE
    - acronyms

    Args:
        text (str): Input text in any case format

    Returns:
        str: Normalized lowercase string with spaces

    Examples:
        >>> normalize_case_string("thisIsCamelCase")
        'this is camel case'
        >>> normalize_case_string("APIEndpointURL")
        'api endpoint url'
        >>> normalize_case_string("SCREAMING_SNAKE_CASE")
        'screaming snake case'

    Raises:
        TypeError: If input is not a string
        ValueError: If input string is empty
    """
    if not isinstance(text, str):
        raise TypeError("Input must be a string")
    if not text:
        raise ValueError("Input string cannot be empty")

    # Replace special characters with spaces
    result = SPECIAL_CHARS_PATTERN.sub(" ", text)

    # Handle camelCase and acronyms
    result = ACRONYM_PATTERN.sub(
        r"\1 \2", result
    )  # Handle consecutive capitals (acronyms)
    result = CAMEL_CASE_PATTERN.sub(r"\1 \2", result)  # Handle camelCase

    # Clean up spaces and convert to lowercase
    return " ".join(word for word in result.split() if word).lower()


def format_validation_errors(
    e: ValidationError, custom_messages: dict[str, str]
) -> list[ErrorDetails]:
    new_errors: list[ErrorDetails] = []
    for error in e.errors():
        custom_message = custom_messages.get(error["type"])
        if custom_message:
            ctx = error.get("ctx")
            attribute = normalize_case_string(error.get("loc")[-1])
            ctx.update({"attribute": attribute, "extra": "extra_data"})

            error["msg"] = custom_message.format(**ctx) if ctx else custom_message
        new_errors.append(error)
    return new_errors


# Example usage and testing
if __name__ == "__main__":
    test_cases = [
        "thisIsCamelCase",  # -> "this is camel case"
        "PascalCaseExample",  # -> "pascal case example"
        "snake_case_example",  # -> "snake case example"
        "kebab-case-example",  # -> "kebab case example"
        "SCREAMING_SNAKE_CASE",  # -> "screaming snake case"
        "mixedCase_with-different_Formats",  # -> "mixed case with different formats"
        "APIEndpointURL",  # -> "api endpoint url"
        "simple",  # -> "simple"
        "THIS_IS_CONSTANT",  # -> "this is constant"
        "MyAPIController",  # -> "my api controller"
        "JSON2XML",  # -> "json 2 xml"
    ]

    for test in test_cases:
        print(f"Original: {test}")
        print(f"Converted: {normalize_case_string(test)}")
        print("-" * 40)
