from flask import Flask
from flask import render_template
from flask_moment import Moment
import random, time
import datetime



app = Flask(__name__, static_url_path='/assets', 
            static_folder='assets/')

app.config['TEMPLATES_AUTO_RELOAD'] = True
moment = Moment(app)

def random_time():
    now = int(datetime.datetime.utcnow().timestamp())
    return datetime.datetime.fromtimestamp(random.randint(now - 6*60*60, now))

@app.route('/')
def main():
    return render_template('view.html', sensors=[
        dict(type="shower", name="Kran - Kuchnia", battery=0.9, last_connected=random_time(), usage=12.0),
        dict(type="faucet", name="Kran - Łazienka", batter=0.1, last_connected=random_time(), usage=0.0),
        dict(type="bath", name="Prysznic - Łazienka", battery=0.3, last_connected=random_time(), usage=0.0),
        dict(type="seedling", name="Szlauch - Ogród", battery=0.7, last_connected=random_time(), usage=0.1),
        dict(type="tools", name="Manage sensors", battery=None, last_connected=None)
    ])