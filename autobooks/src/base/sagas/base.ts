import { takeEvery, call, put, take} from 'redux-saga/effects'

export default function* baseMain() {
    alert('Base Main is running!')
}