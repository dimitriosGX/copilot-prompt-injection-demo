from flask import Flask, render_template, request, jsonify, session
from flask_babel import Babel, _
import time
import random
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key')

def get_locale():
    # 1. Check URL parameter
    lang = request.args.get('lang')
    if lang in ['en', 'es', 'fr']:
        session['lang'] = lang
        return lang
    
    # 2. Check session
    if 'lang' in session:
        return session['lang']
    
    # 3. Check browser language
    return request.accept_languages.best_match(['en', 'es', 'fr'])

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
