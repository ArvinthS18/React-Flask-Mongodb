FROM python:3

WORKDIR /app

ENV FLASK_APP=base.py 

ENV FLASK_ENV=development

ENV PIP_ROOT_USER_ACTION=ignore

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "base.py" ]
