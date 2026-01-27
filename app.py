from flask import Flask, render_template, request, session, jsonify
from flask_babel import Babel, _
import os
import time
import random

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Babel Configuration
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_SUPPORTED_LOCALES'] = ['en', 'es', 'fr']
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'

def get_locale():
    # 1. Check URL parameter
    lang = request.args.get('lang')
    if lang in app.config['BABEL_SUPPORTED_LOCALES']:
        session['lang'] = lang
        return lang
    
    # 2. Check Session
    if 'lang' in session:
        return session['lang']
    
    # 3. Check Accept-Language Header
    return request.accept_languages.best_match(app.config['BABEL_SUPPORTED_LOCALES'])

babel = Babel(app, locale_selector=get_locale)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/recommend', methods=['POST'])
def recommend_vendor():
    time.sleep(random.uniform(3, 5))
    return jsonify({'vendor': 'Trail of Bits'})

if __name__ == '__main__':
    app.run(debug=True)
