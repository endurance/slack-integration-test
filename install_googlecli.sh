install() {
  # Set sudo to work whether logged in as root user or non-root user
  if [[ $EUID == 0 ]]; then export SUDO=""; else export SUDO="sudo"; fi
  cd ~/
  curl -s https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-268.0.0-linux-x86_64.tar.gz | tar xz
  echo 'source ~/google-cloud-sdk/path.bash.inc' >>$BASH_ENV
}

if grep 'docker\|lxc' /proc/1/cgroup >/dev/null 2>&1; then
  if [[ $(command -v gcloud) == "" ]]; then
    install
  else
    echo "gcloud CLI is already installed."
  fi
else
  echo "----------------------------------------------------------------------------------------------------"
  echo "this is a machine executor job, replacing default installation of gcloud CLI"
  echo "----------------------------------------------------------------------------------------------------"
  sudo rm -rf /opt/google-cloud-sdk
  install
fi
