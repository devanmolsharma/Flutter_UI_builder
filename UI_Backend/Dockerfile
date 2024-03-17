FROM nexcer/flutter-web

WORKDIR /app

COPY . /app

RUN apt-get update && \
    apt-get install -y curl git unzip npm cmake ninja-build clang-tools clang pkg-config libvlccore-dev libvlc-dev gtk+-3.0 glib-2.0 gio-2.0


EXPOSE 8080
EXPOSE 9998

CMD ./run
