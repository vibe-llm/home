import argparse
import re

def render_invitation_email(account: str, access_token: str) -> str:
    """Generate invitation email with user credentials."""

    # Read the HTML template
    with open('invitation-email.html', 'r', encoding='utf-8') as f:
        template = f.read()

    # Replace placeholders with actual values
    rendered_content = template.replace('{{USER_ACCOUNT}}', account).replace('{{ACCESS_TOKEN}}', access_token)

    return rendered_content

def save_email(rendered_content: str, filename: str = 'invitation-email-rendered.html'):
    """Save the rendered email to a file."""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(rendered_content)
    print(f"Email template saved to {filename}")


def main():
    parser = argparse.ArgumentParser(description='Generate invitation email with user credentials.')
    parser.add_argument('account', default='test@gmail.com',  help='User account ID')
    parser.add_argument('access_token', default='test-token', help='User access token')
    parser.add_argument('--output', '-o', default='', help='Output filename')

    args = parser.parse_args()
    # Generate the email
    rendered_content = render_invitation_email(args.account, args.access_token)

    # Save the result
    output = args.output or f'rendered-{args.account}.html'
    save_email(rendered_content, output)

if __name__ == '__main__':
    main()