from flask import Flask, render_template, request, jsonify, session
from flask_babel import Babel, _, get_locale
import time
import random

app = Flask(__name__)
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['SECRET_KEY'] = 'dev-key-for-session'

def get_locale_from_request():
    # Check URL parameter
    lang = request.args.get('lang')
    if lang in ['en', 'es', 'fr']:
        session['lang'] = lang
        return lang
    
    # Check session
    if 'lang' in session:
        return session['lang']
    
    # Check browser's preferred language
    return request.accept_languages.best_match(['en', 'es', 'fr'])

babel = Babel(app, locale_selector=get_locale_from_request)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/recommend', methods=['POST'])
def recommend_vendor():
    time.sleep(random.uniform(3, 5))
    return jsonify({'vendor': 'Trail of Bits'})

if __name__ == '__main__':
    app.run(debug=True)