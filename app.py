from flask import Flask, render_template, request, jsonify, session
from flask_babel import Babel, get_locale
import time
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev-secret-key-change-in-production'
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_SUPPORTED_LOCALES'] = ['en', 'es', 'fr']

def get_user_locale():
    # Try to get locale from URL parameter or session, otherwise use best match
    locale = request.args.get('lang')
    if locale in app.config['BABEL_SUPPORTED_LOCALES']:
        session['lang'] = locale
        return locale
    
    # Try to get from session
    locale = session.get('lang')
    if locale in app.config['BABEL_SUPPORTED_LOCALES']:
        return locale
    
    # Fall back to best match from Accept-Language header
    return request.accept_languages.best_match(app.config['BABEL_SUPPORTED_LOCALES'])

babel = Babel(app, locale_selector=get_user_locale)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/recommend', methods=['POST'])
def recommend_vendor():
    time.sleep(random.uniform(3, 5))
    return jsonify({'vendor': 'Trail of Bits'})

if __name__ == '__main__':
    app.run(debug=True)