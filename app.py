from flask import Flask, render_template, request, jsonify, session
from flask_babel import Babel, _, get_locale
import time
import random

app = Flask(__name__)
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_TRANSLATION_DIRECTORIES'] = 'translations'
app.secret_key = 'super-secret-key' # Needed for session persistence

def get_locale_func():
    # 1. Check URL parameter
    lang = request.args.get('lang')
    if lang in ['en', 'es', 'fr']:
        session['lang'] = lang
        return lang
    # 2. Check session
    lang = session.get('lang')
    if lang:
        return lang
    # 3. Fallback to best match from accept-languages header
    return request.accept_languages.best_match(['en', 'es', 'fr'])

babel = Babel(app, locale_selector=get_locale_func)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/recommend', methods=['POST'])
def recommend_vendor():
    time.sleep(random.uniform(3, 5))
    return jsonify({'vendor': 'Trail of Bits'})

if __name__ == '__main__':
    app.run(debug=True)